const express = require('express');
const { addNote, getNotes, deleteNote } = require('../controllers/noteController');

const router = express.Router();

router.post('/', addNote); // Add a new note
router.get('/', getNotes);  // Get all notes
router.delete('/:id', deleteNote); // Delete a note by ID

module.exports = router;
