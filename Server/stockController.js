const Stock = require('../models/Stock');

// Add stock item
exports.addStock = async (req, res) => {
    const { itemName, quantity, amount } = req.body;
    try {
        const newStock = new Stock({ itemName, quantity, amount });
        const savedStock = await newStock.save();
        res.status(201).json({ message: 'Stock item added successfully', stock: savedStock });
    } catch (error) {
        console.error('Error adding stock item:', error);
        res.status(500).json({ message: 'Error adding stock item' });
    }
};

// Get all stock items
exports.getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.status(200).json(stocks);
    } catch (error) {
        console.error('Error fetching stock items:', error);
        res.status(500).json({ message: 'Error fetching stock items' });
    }
};
