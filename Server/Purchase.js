const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
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

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;
