const Sold = require('../models/Sold');
const Stock = require('../models/Stock');

// Add sold item
exports.addSold = async (req, res) => {
    const { itemName, quantity, amount } = req.body;

    // Validate input
    if (!itemName || quantity <= 0 || amount <= 0) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        // Find the stock item
        const stockItem = await Stock.findOne({ itemName });

        if (!stockItem) {
            return res.status(404).json({ message: 'Item not found in stock' });
        }

        // Check if the stock has enough quantity to sell
        if (stockItem.quantity < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Deduct the sold quantity from the stock
        stockItem.quantity -= quantity;
        stockItem.amount -= amount;

        // Remove stock if quantity is 0
        if (stockItem.quantity === 0) {
            await stockItem.remove();
        } else {
            await stockItem.save();
        }

        // Add sold item record to the Sold collection
        const soldItem = new Sold({ itemName, quantity, amount });
        await soldItem.save();

        res.status(201).json({ message: 'Sold item recorded and stock updated successfully', soldItem });
    } catch (error) {
        console.error('Error recording sold item:', error);
        res.status(500).json({ message: 'Error recording sold item' });
    }
};

// Get all sold items
exports.getSoldItems = async (req, res) => {
    try {
        const soldItems = await Sold.find();
        res.status(200).json(soldItems);
    } catch (error) {
        console.error('Error fetching sold items:', error);
        res.status(500).json({ message: 'Error fetching sold items' });
    }
};
