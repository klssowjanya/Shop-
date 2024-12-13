const mongoose = require('mongoose');

const soldSchema = new mongoose.Schema({
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
});

const Sold = mongoose.model('Sold', soldSchema);
module.exports = Sold;
