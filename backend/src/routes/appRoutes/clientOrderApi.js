const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Client = mongoose.model('Client');
const Product = mongoose.model('Product');

// POST /api/client/neworder/:id - Place a new order for an existing customer
router.post('/client/neworder/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({
                success: false,
                result: null,
                message: 'Customer not found',
            });
        }

        const purchases = req.body.purchases || [];
        if (purchases.length === 0) {
            return res.status(400).json({
                success: false,
                result: null,
                message: 'No products provided',
            });
        }

        const customerId = client.customerId;
        let currentInquiryNo = client.lastInquiryNo || 0;
        const newQuoteId = (client.lastQuoteId || 0) + 1;

        const newPurchases = [];

        for (const purchase of purchases) {
            currentInquiryNo++;

            let productName = '';
            if (purchase.product) {
                const prod = await Product.findById(purchase.product).lean();
                if (prod) {
                    productName = prod.name;
                }
            }

            newPurchases.push({
                product: purchase.product,
                productName: productName,
                quantity: purchase.quantity || 1,
                inquiryNo: `${customerId}.${currentInquiryNo}`,
                quoteId: `${customerId}.${newQuoteId}`,
            });
        }

        // Append new purchases to existing ones
        client.purchases = [...(client.purchases || []), ...newPurchases];
        client.lastInquiryNo = currentInquiryNo;
        client.lastQuoteId = newQuoteId;
        client.updated = Date.now();

        await client.save();

        return res.status(200).json({
            success: true,
            result: client,
            message: 'New order placed successfully',
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
