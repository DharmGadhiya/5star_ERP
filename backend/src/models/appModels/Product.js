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
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  materials: {
    steel: { type: Number, default: 0 },
    alloy: { type: Number, default: 0 },
    rubber: { type: Number, default: 0 },
    glass: { type: Number, default: 0 },
    fibre: { type: Number, default: 0 },
    assemblyKits: { type: Number, default: 0 },
    fluidKits: { type: Number, default: 0 },
    paint: { type: Number, default: 0 },
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', schema);
