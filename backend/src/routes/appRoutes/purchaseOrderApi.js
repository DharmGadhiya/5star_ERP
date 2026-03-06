const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const PurchaseOrder = mongoose.model('PurchaseOrder');
const Inventory = mongoose.model('Inventory');

// GET /api/purchase-orders/pending
router.get('/purchase-orders/pending', async (req, res) => {
    try {
        const list = await PurchaseOrder.find({ removed: false, status: 'Pending' }).sort({ created: -1 });
        return res.status(200).json({ success: true, result: list });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/purchase-orders/history
router.get('/purchase-orders/history', async (req, res) => {
    try {
        const list = await PurchaseOrder.find({ removed: false, status: 'Arrived' }).sort({ updated: -1 });
        return res.status(200).json({ success: true, result: list });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/purchase-orders/:id/arrive
router.post('/purchase-orders/:id/arrive', async (req, res) => {
    try {
        const po = await PurchaseOrder.findById(req.params.id);
        if (!po) {
            return res.status(404).json({ success: false, message: 'Purchase Order not found' });
        }

        if (po.status === 'Arrived') {
            return res.status(400).json({ success: false, message: 'Already marked as Arrived' });
        }

        const inventory = await Inventory.findOne();
        if (!inventory) {
            return res.status(500).json({ success: false, message: 'Inventory not found' });
        }

        // Increment inventory
        for (const item of po.items) {
            // The material name is saved directly in the item
            const mat = item.material;
            if (typeof inventory[mat] !== 'undefined') {
                inventory[mat] += item.quantity;
            }
        }

        inventory.updated = Date.now();
        await inventory.save();

        // Mark PO as arrived
        po.status = 'Arrived';
        po.updated = Date.now();
        await po.save();

        return res.status(200).json({ success: true, result: po, message: 'Purchase Order arrived and Inventory updated.' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
