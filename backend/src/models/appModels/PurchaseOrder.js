const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    purchaseId: {
        type: Number,
        unique: true,
    },
    quoteId: {
        type: String,
        required: true,
    },
    items: [
        {
            material: String,
            quantity: Number,
            price: Number,
            totalPrice: Number,
        },
    ],
    grandTotal: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['Pending', 'Arrived'],
        default: 'Pending',
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('PurchaseOrder', schema);
