const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },

  customerId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: String,
  country: String,
  address: String,
  email: String,
  lastInquiryNo: {
    type: Number,
    default: 0,
  },
  lastQuoteId: {
    type: Number,
    default: 0,
  },
  purchases: [
    {
      product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
      productName: String,
      quantity: { type: Number, default: 1 },
      inquiryNo: String,
      quoteId: String,
      isApproved: { type: Boolean, default: false },
    },
  ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  assigned: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Client', schema);
