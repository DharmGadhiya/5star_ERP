const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    invoiceId: {
        type: Number,
        unique: true,
    },
    salesId: {
        type: Number,
        required: true,
    },
    quoteId: {
        type: String,
        required: true,
    },
    customerId: {
        type: Number,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
    products: [
        {
            productName: String,
            quantity: Number,
            price: Number,
            total: Number,
        },
    ],
    grandTotal: {
        type: Number,
        default: 0,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('AppInvoice', schema);
