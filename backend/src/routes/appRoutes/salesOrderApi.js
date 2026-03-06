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

module.exports = router;
