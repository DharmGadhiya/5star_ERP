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

        // --- CHART DATA GENERATION --- //

        // 1. Vehicle Sales Data
        const salesDataArray = await SalesOrder.aggregate([
            { $match: { removed: false } },
            { $unwind: "$products" },
            { $group: { _id: "$products.productName", totalQuantity: { $sum: "$products.quantity" } } }
        ]);

        // 2. Inventory Stock Data
        let inventoryData = [];
        if (inventory) {
            const mats = ['steel', 'alloy', 'rubber', 'glass', 'fibre', 'assemblyKits', 'fluidKits', 'paint'];
            inventoryData = mats.map(mat => ({
                material: mat.charAt(0).toUpperCase() + mat.slice(1),
                quantity: inventory[mat] || 0
            }));
        }

        // 3. Revenue vs Profit Data (Group by month from AppInvoice)
        const revenueByMonth = await AppInvoice.aggregate([
            { $match: { removed: false } },
            {
                $group: {
                    _id: { $month: "$created" },
                    revenue: { $sum: "$grandTotal" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyRevenue = revenueByMonth.map(m => ({
            month: monthNames[m._id - 1] || "Unknown",
            revenue: m.revenue,
            profit: m.revenue * 0.20
        }));

        // 4. Employee Productivity (HR Module Distribution)
        const HrModule = mongoose.model('HrModule');
        const hrData = await HrModule.find({ removed: false }, { employeeType: 1, numberOfEmployees: 1 });

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
                totalProfit,
                chartData: {
                    vehicleSales: salesDataArray,
                    inventory: inventoryData,
                    monthlyRevenue: monthlyRevenue,
                    employees: hrData
                }
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
