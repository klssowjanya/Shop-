import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styles for the Notes component
const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px',
        display: 'inline-block',
        width: '250px', // Adjusted width for better list structure
        textAlign: 'left', // Align text to left for list
    },
    button: {
        padding: '10px 20px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '10px',
    },
    textarea: {
        width: '300px', 
        height: '100px', 
        margin: '10px',
    },
    noteList: {
        listStyleType: 'disc', // Style the list items
        paddingLeft: '20px',
    }
};

const Notes = () => {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/notes');
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const handleAddNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/notes', { note });
            alert('Note added successfully');
            setNote('');

            // Fetch the updated list of notes
            const response = await axios.get('http://localhost:5000/api/notes');
            setNotes(response.data);
        } catch (error) {
            alert(`Error adding note: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`);
            alert('Note deleted successfully');

            // Fetch the updated list of notes
            const response = await axios.get('http://localhost:5000/api/notes');
            setNotes(response.data);
        } catch (error) {
            alert(`Error deleting note: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Notes Management</h2>
            <form onSubmit={handleAddNote}>
                <textarea
                    placeholder="Write a note (separate points with spaces)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                    style={styles.textarea}
                />
                <br />
                <button type="submit" style={styles.button}>Add Note</button>
            </form>

            <h3>Notes List</h3>
            <div>
                {notes.map((n) => (
                    <div key={n._id} style={styles.card}>
                        <ul style={styles.noteList}>
                            {/* Split the note by spaces and represent each word as a list item */}
                            {n.note.split(' ').map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                        <button 
                            style={styles.button} 
                            onClick={() => handleDeleteNote(n._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;