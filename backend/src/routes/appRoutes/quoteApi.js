const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Client = mongoose.model('Client');

// GET /api/quotes/customers - Get all customers who have purchases
router.get('/quotes/customers', async (req, res) => {
    try {
        const clients = await Client.find(
            { removed: false, 'purchases.0': { $exists: true } },
            { customerId: 1, name: 1, purchases: 1, lastQuoteId: 1, lastInquiryNo: 1 }
        )
            .populate('purchases.product', 'name price')
            .sort({ customerId: 1 })
            .lean();

        return res.status(200).json({
            success: true,
            result: clients,
            message: 'Customers with quotes fetched successfully',
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
