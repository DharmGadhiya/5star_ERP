const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Inventory = mongoose.model('Inventory');

// GET /api/inventory - Get current inventory (creates default if none exists)
router.get('/inventory', async (req, res) => {
    try {
        let inventory = await Inventory.findOne();
        if (!inventory) {
            inventory = await Inventory.create({
                steel: 0,
                steelPrice: 60,
                alloy: 0,
                alloyPrice: 120,
                rubber: 0,
                rubberPrice: 150,
                glass: 0,
                glassPrice: 40,
                fibre: 0,
                fibrePrice: 200,
                assemblyKits: 0,
                assemblyKitsPrice: 50,
                fluidKits: 0,
                fluidKitsPrice: 180,
                paint: 0,
                paintPrice: 250,
            });
        }
        return res.status(200).json({
            success: true,
            result: inventory,
            message: 'Inventory fetched successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            result: null,
            message: error.message,
        });
    }
});

// PATCH /api/inventory/update - Update inventory quantities using delta values
router.patch('/inventory/update', async (req, res) => {
    try {
        let inventory = await Inventory.findOne();
        if (!inventory) {
            inventory = await Inventory.create({
                steel: 0,
                steelPrice: 60,
                alloy: 0,
                alloyPrice: 120,
                rubber: 0,
                rubberPrice: 150,
                glass: 0,
                glassPrice: 40,
                fibre: 0,
                fibrePrice: 200,
                assemblyKits: 0,
                assemblyKitsPrice: 50,
                fluidKits: 0,
                fluidKitsPrice: 180,
                paint: 0,
                paintPrice: 250,
            });
        }

        const updates = req.body;
        const materialFields = [
            'steel', 'alloy', 'rubber', 'glass',
            'fibre', 'assemblyKits', 'fluidKits', 'paint',
        ];

        materialFields.forEach((field) => {
            if (updates[field] !== undefined) {
                inventory[field] = inventory[field] + Number(updates[field]);
            }
        });

        inventory.updated = Date.now();
        await inventory.save();

        return res.status(200).json({
            success: true,
            result: inventory,
            message: 'Inventory updated successfully',
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
