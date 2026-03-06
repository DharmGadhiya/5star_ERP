const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    steel: { type: Number, default: 0 },
    alloy: { type: Number, default: 0 },
    rubber: { type: Number, default: 0 },
    glass: { type: Number, default: 0 },
    fibre: { type: Number, default: 0 },
    assemblyKits: { type: Number, default: 0 },
    fluidKits: { type: Number, default: 0 },
    paint: { type: Number, default: 0 },
    updated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Inventory', schema);
