const express = require('express');
const { addPurchase, getPurchaseItems } = require('../controllers/purchaseController');
const router = express.Router();

router.post('/', addPurchase); // POST route to add purchase item
router.get('/', getPurchaseItems); // GET route to retrieve purchase items

module.exports = router;
