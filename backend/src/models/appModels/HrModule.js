const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hrModuleSchema = new Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    employeeType: {
        type: String,
        required: true,
    },
    numberOfEmployees: {
        type: Number,
        required: true,
    },
    averageSalary: {
        type: Number,
        required: true,
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

module.exports = mongoose.model('HrModule', hrModuleSchema);
