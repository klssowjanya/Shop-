const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: true,
    },
}, { timestamps: true });  // Adds createdAt and updatedAt fields

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
