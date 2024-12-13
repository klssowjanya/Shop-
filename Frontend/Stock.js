// src/components/Stock.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stock = () => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amount, setAmount] = useState('');
    const [stockRecords, setStockRecords] = useState([]);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    // Fetch stock records from the server when the component mounts
    useEffect(() => {
        const fetchStockRecords = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stock');
                setStockRecords(response.data); // Assuming the response data is an array of stock items
            } catch (error) {
                console.error('Error fetching stock records:', error);
                setError('Error fetching stock records');
            }
        };

        fetchStockRecords();
    }, []);

    const handleAddStock = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/stock', {
                itemName,
                quantity,
                amount,
            });
            alert('Stock item added successfully');
            // Clear the form fields
            setItemName('');
            setQuantity(0);
            setAmount(0);
            setError('');
            // Fetch updated stock records
            const updatedRecords = await axios.get('http://localhost:5000/api/stock');
            setStockRecords(updatedRecords.data);
            setShowForm(false); // Hide the form after adding stock
        } catch (error) {
            console.error('Error adding stock:', error.response?.data || error);
            setError(error.response?.data?.message || 'Error adding stock item');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Add New Stock Item</h2>
            {!showForm ? (
                <button
                    onClick={() => setShowForm(true)}
                    style={{ marginBottom: '20px', padding: '10px 15px', fontSize: '16px' }}
                >
                    Add Stock
                </button>
            ) : (
                <div style={styles.formContainer}>
                    <form onSubmit={handleAddStock} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Item Name:
                                <input
                                    type="text"
                                    placeholder="Item Name"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                            </label>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Quantity:
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    required
                                    style={styles.input}
                                />
                            </label>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Amount:
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    required
                                    style={styles.input}
                                />
                            </label>
                        </div>
                        <div style={styles.buttonContainer}>
                            <button type="submit" style={styles.submitButton}>Add Stock</button>
                            <button type="button" onClick={() => setShowForm(false)} style={styles.cancelButton}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

            <h2>Current Stock Records</h2>
            <table style={{ margin: '0 auto', width: '60%', borderCollapse: 'collapse', border: '2px solid #000' }}>
                <thead>
                    <tr>
                        <th style={{ border: '2px solid #ccc', padding: '8px' }}>Item Name</th>
                        <th style={{ border: '2px solid #ccc', padding: '8px' }}>Quantity</th>
                        <th style={{ border: '2px solid #ccc', padding: '8px' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {stockRecords.length > 0 ? (
                        stockRecords.map((record) => (
                            <tr key={record._id}>
                                <td style={{ border: '2px solid #ccc', padding: '8px' }}>{record.itemName}</td>
                                <td style={{ border: '2px solid #ccc', padding: '8px' }}>{record.quantity}</td>
                                <td style={{ border: '2px solid #ccc', padding: '8px' }}>{record.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center', padding: '8px' }}>No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// Styles for the form container and elements
const styles = {
    formContainer: {
        maxWidth: '400px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        fontSize: '16px',
        marginBottom: '5px', // Space between label and input
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        width: '100%', // Full width
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between', // Space between buttons
    },
    submitButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px',
    },
    cancelButton: {
        padding: '10px',
        backgroundColor: '#f44336', // Red background for cancel
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Stock;
