const express = require('express');
const { addSold, getSoldItems } = require('../controllers/soldController');
const router = express.Router();

router.post('/', addSold); // POST route to add sold items
router.get('/', getSoldItems); // GET route to retrieve sold items

module.exports = router;
