const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Client = mongoose.model('Client');
const Product = mongoose.model('Product');
const Inventory = mongoose.model('Inventory');
const SalesOrder = mongoose.model('SalesOrder');
const PurchaseOrder = mongoose.model('PurchaseOrder');
const AppInvoice = mongoose.model('AppInvoice');

// GET /api/dashboard/summary
router.get('/dashboard/summary', async (req, res) => {
    try {
        // 1 & 2. Customers and Products
        const totalCustomers = await Client.countDocuments({ removed: false });
        const totalProducts = await Product.countDocuments({ removed: false });

        // 3. Total Raw Materials (sum of inventory values)
        const inventory = await Inventory.findOne();
        let totalRawMaterials = 0;
        if (inventory) {
            const mats = ['steel', 'alloy', 'rubber', 'glass', 'fibre', 'assemblyKits', 'fluidKits', 'paint'];
            mats.forEach(mat => {
                totalRawMaterials += (inventory[mat] || 0);
            });
        }

        // 4, 5, 6. Orders and Invoices
        const totalSalesOrders = await SalesOrder.countDocuments({ removed: false });
        const totalPurchaseOrders = await PurchaseOrder.countDocuments({ removed: false });
        const totalInvoices = await AppInvoice.countDocuments({ removed: false });

        // 7. Total Revenue
        const invoices = await AppInvoice.find({ removed: false }, { grandTotal: 1 });
        const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);

        // 8. Total Expenses
        const purchases = await PurchaseOrder.find({ removed: false }, { grandTotal: 1 });
        const totalExpenses = purchases.reduce((sum, po) => sum + (po.grandTotal || 0), 0);

        // 9. Total Profit
        const totalProfit = totalRevenue * 0.20;

        return res.status(200).json({
            success: true,
            result: {
                totalCustomers,
                totalProducts,
                totalRawMaterials,
                totalSalesOrders,
                totalPurchaseOrders,
                totalInvoices,
                totalRevenue,
                totalExpenses,
                totalProfit
            },
            message: 'Dashboard metrics calculated successfully',
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
