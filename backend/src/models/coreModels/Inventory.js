const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    steel: { type: Number, default: 0 },
    steelPrice: { type: Number, default: 60 },
    alloy: { type: Number, default: 0 },
    alloyPrice: { type: Number, default: 120 },
    rubber: { type: Number, default: 0 },
    rubberPrice: { type: Number, default: 150 },
    glass: { type: Number, default: 0 },
    glassPrice: { type: Number, default: 40 },
    fibre: { type: Number, default: 0 },
    fibrePrice: { type: Number, default: 200 },
    assemblyKits: { type: Number, default: 0 },
    assemblyKitsPrice: { type: Number, default: 50 },
    fluidKits: { type: Number, default: 0 },
    fluidKitsPrice: { type: Number, default: 180 },
    paint: { type: Number, default: 0 },
    paintPrice: { type: Number, default: 250 },
    updated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Inventory', schema);
