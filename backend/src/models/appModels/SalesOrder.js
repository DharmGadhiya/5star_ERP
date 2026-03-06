const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    salesId: {
        type: Number,
        unique: true,
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
        type: Number, // in days
        required: true,
    },
    products: [
        {
            productName: String,
            quantity: Number,
        },
    ],
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('SalesOrder', schema);
