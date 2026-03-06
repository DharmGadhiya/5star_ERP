const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Client = mongoose.model('Client');
const Product = mongoose.model('Product');
const Inventory = mongoose.model('Inventory');
const PurchaseOrder = mongoose.model('PurchaseOrder');
const SalesOrder = mongoose.model('SalesOrder');

// Material pricing map mapping to exact schema fields in Inventory model
const MATERIAL_PRICE_FIELDS = {
    steel: 'steelPrice',
    alloy: 'alloyPrice',
    rubber: 'rubberPrice',
    glass: 'glassPrice',
    fibre: 'fibrePrice',
    assemblyKits: 'assemblyKitsPrice',
    fluidKits: 'fluidKitsPrice',
    paint: 'paintPrice',
};

// POST /api/quotes/approve/:quoteId - Approves a quote, calculating deficits and generating PO/SO
router.post('/quotes/approve/:quoteId', async (req, res) => {
    const { quoteId } = req.params;

    try {
        // 1. Find the client and the specific purchases that match this quoteId
        const client = await Client.findOne({ 'purchases.quoteId': quoteId });
        if (!client) {
            return res.status(404).json({ success: false, message: 'Quote not found.' });
        }

        const quotePurchases = client.purchases.filter(p => p.quoteId === quoteId);

        // Check if already approved
        if (quotePurchases.length > 0 && quotePurchases[0].isApproved) {
            return res.status(400).json({ success: false, message: 'Quote is already approved.' });
        }

        // 2. Calculate Required Materials and Max Duration
        let requiredMaterials = {
            steel: 0, alloy: 0, rubber: 0, glass: 0,
            fibre: 0, assemblyKits: 0, fluidKits: 0, paint: 0
        };

        let totalBaseDuration = 0;
        const soProducts = [];

        // Process each product in the quote
        for (const purchase of quotePurchases) {
            if (purchase.product) {
                const product = await Product.findById(purchase.product).lean();
                if (product) {
                    soProducts.push({
                        productName: product.name,
                        quantity: purchase.quantity
                    });

                    // Accumulate total duration based on quantity
                    totalBaseDuration += (product.duration * purchase.quantity);

                    // Accumulate material requirements
                    if (product.materials) {
                        for (const mat of Object.keys(requiredMaterials)) {
                            if (product.materials[mat]) {
                                requiredMaterials[mat] += (product.materials[mat] * purchase.quantity);
                            }
                        }
                    }
                }
            }
        }

        // 3. Compare with Inventory
        let inventory = await Inventory.findOne();
        if (!inventory) {
            return res.status(500).json({ success: false, message: 'Inventory not initialized.' });
        }

        const deficitMaterials = [];
        let needPurchaseOrder = false;

        for (const mat of Object.keys(requiredMaterials)) {
            const needed = requiredMaterials[mat];
            const available = inventory[mat] || 0;

            if (needed > available) {
                needPurchaseOrder = true;
                const deficitQty = needed - available;

                // Lookup price from inventory doc
                const priceField = MATERIAL_PRICE_FIELDS[mat];
                const unitPrice = inventory[priceField] || 0;

                deficitMaterials.push({
                    material: mat,
                    quantity: deficitQty,
                    price: unitPrice,
                    totalPrice: deficitQty * unitPrice
                });
            }
        }

        // 4. Generate Purchase Order if necessary
        if (needPurchaseOrder) {
            const grandTotal = deficitMaterials.reduce((sum, item) => sum + item.totalPrice, 0);

            // Generating unique Purchase ID sequentially
            const lastPO = await PurchaseOrder.findOne({}, { purchaseId: 1 }).sort({ purchaseId: -1 }).lean();
            const nextPurchaseId = lastPO && lastPO.purchaseId ? lastPO.purchaseId + 1 : 1;

            await PurchaseOrder.create({
                purchaseId: nextPurchaseId,
                quoteId: quoteId,
                items: deficitMaterials,
                grandTotal: grandTotal,
                status: 'Pending'
            });
        }

        // 5. Generate Sales Order
        const deliveryTime = needPurchaseOrder ? totalBaseDuration + 2 : totalBaseDuration;

        const lastSO = await SalesOrder.findOne({}, { salesId: 1 }).sort({ salesId: -1 }).lean();
        const nextSalesId = lastSO && lastSO.salesId ? lastSO.salesId + 1 : 1;

        await SalesOrder.create({
            salesId: nextSalesId,
            quoteId: quoteId,
            customerId: client.customerId,
            deliveryTime: deliveryTime,
            products: soProducts
        });

        // 6. Mark Quote as Approved
        client.purchases.forEach(p => {
            if (p.quoteId === quoteId) {
                p.isApproved = true;
            }
        });

        client.updated = Date.now();
        await client.save();

        return res.status(200).json({
            success: true,
            result: {
                purchaseOrderCreated: needPurchaseOrder,
                deliveryTime: deliveryTime
            },
            message: 'Quote approved successfully.'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            result: null,
            message: error.message,
        });
    }
});

module.exports = router;
