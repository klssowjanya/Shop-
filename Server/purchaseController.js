const Purchase = require('../models/Purchase');

// Add purchase item
exports.addPurchase = async (req, res) => {
    const { itemName, quantity, amount } = req.body;
    try {
        const newPurchase = new Purchase({ itemName, quantity, amount });
        await newPurchase.save();
        res.status(201).json({ message: 'Purchase item recorded successfully' });
    } catch (error) {
        console.error('Error adding purchase item:', error);
        res.status(500).json({ message: 'Error adding purchase item' });
    }
};

// Get all purchase items
exports.getPurchaseItems = async (req, res) => {
    try {
        const purchaseItems = await Purchase.find();
        res.status(200).json(purchaseItems);
    } catch (error) {
        console.error('Error fetching purchase items:', error);
        res.status(500).json({ message: 'Error fetching purchase items' });
    }
};
