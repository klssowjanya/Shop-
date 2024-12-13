const express = require('express');
const { addStock, getStocks } = require('../controllers/stockController');
const router = express.Router();

router.post('/', addStock); // POST route to add stock item
router.get('/', getStocks); // GET route to retrieve all stock items

module.exports = router;
