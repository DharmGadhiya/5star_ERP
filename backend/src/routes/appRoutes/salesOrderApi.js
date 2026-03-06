const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const SalesOrder = mongoose.model('SalesOrder');

// GET /api/sales-orders
router.get('/sales-orders', async (req, res) => {
    try {
        const salesOrders = await SalesOrder.find({ removed: false }).sort({ created: -1 });

        return res.status(200).json({
            success: true,
            result: salesOrders,
            message: 'Successfully fetched all Sales Orders',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            result: null,
            message: error.message,
        });
    }
});

const AppInvoice = mongoose.model('AppInvoice');
const Product = mongoose.model('Product');
const Inventory = mongoose.model('Inventory');

// POST /api/sales-orders/:id/produce
router.post('/sales-orders/:id/produce', async (req, res) => {
    try {
        const salesOrder = await SalesOrder.findById(req.params.id);
        if (!salesOrder) {
            return res.status(404).json({ success: false, message: 'Sales Order not found' });
        }
        if (salesOrder.isProduced) {
            return res.status(400).json({ success: false, message: 'Sales Order is already produced' });
        }

        // Subtract required materials from Inventory
        const inventory = await Inventory.findOne();
        if (!inventory) {
            return res.status(500).json({ success: false, message: 'Inventory not found' });
        }

        let requiredMaterials = {
            steel: 0, alloy: 0, rubber: 0, glass: 0,
            fibre: 0, assemblyKits: 0, fluidKits: 0, paint: 0
        };

        let invoiceProducts = [];
        let grandTotal = 0;

        for (const item of salesOrder.products) {
            const productDoc = await Product.findOne({ name: item.productName });

            let price = 0;
            if (productDoc) {
                price = productDoc.price || 0;
                for (const mat of Object.keys(requiredMaterials)) {
                    if (productDoc.materials[mat]) {
                        requiredMaterials[mat] += (productDoc.materials[mat] * item.quantity);
                    }
                }
            }

            const itemTotal = price * item.quantity;
            grandTotal += itemTotal;

            invoiceProducts.push({
                productName: item.productName,
                quantity: item.quantity,
                price: price,
                total: itemTotal
            });
        }

        for (const mat of Object.keys(requiredMaterials)) {
            const needed = requiredMaterials[mat];
            if (needed > 0) {
                if ((inventory[mat] || 0) < needed) {
                    return res.status(400).json({ success: false, message: `Insufficient ${mat} in inventory. Need ${needed}, have ${inventory[mat] || 0}.` });
                }
                inventory[mat] -= needed;
            }
        }

        inventory.updated = Date.now();
        await inventory.save();

        // Generate AppInvoice
        const lastInvoice = await AppInvoice.findOne({}, { invoiceId: 1 }).sort({ invoiceId: -1 }).lean();
        const nextInvoiceId = lastInvoice && lastInvoice.invoiceId ? lastInvoice.invoiceId + 1 : 1;

        const newInvoice = await AppInvoice.create({
            invoiceId: nextInvoiceId,
            salesId: salesOrder.salesId,
            quoteId: salesOrder.quoteId,
            customerId: salesOrder.customerId,
            deliveryTime: salesOrder.deliveryTime,
            products: invoiceProducts,
            grandTotal: grandTotal
        });

        // Mark SalesOrder as produced
        salesOrder.isProduced = true;
        salesOrder.updated = Date.now();
        await salesOrder.save();

        return res.status(200).json({
            success: true,
            result: newInvoice,
            message: 'Invoice generated and inventory updated.',
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
