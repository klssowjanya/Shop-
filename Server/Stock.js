const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });  // Adds `createdAt` and `updatedAt` fields

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
