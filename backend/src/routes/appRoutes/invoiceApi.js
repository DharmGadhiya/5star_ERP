const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const AppInvoice = mongoose.model('AppInvoice');

// GET /api/app-invoices
router.get('/app-invoices', async (req, res) => {
    try {
        const invoices = await AppInvoice.find({ removed: false }).sort({ created: -1 });

        return res.status(200).json({
            success: true,
            result: invoices,
            message: 'Successfully fetched all invoices',
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
