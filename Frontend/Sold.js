import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styles for the Sold component
const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    table: {
        width: '80%',
        margin: '20px auto',
        borderCollapse: 'collapse',
        border: '2px solid #000',
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
    },
    th: {
        padding: '10px',
        border: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
    },
    form: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        marginBottom: '10px',
        width: '300px', // Adjust input width
        padding: '8px', // Add padding for input fields
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px', // Space between buttons
    },
};

const Sold = () => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState('');
    const [soldItems, setSoldItems] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to manage form visibility

    useEffect(() => {
        const fetchSoldItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sold');
                setSoldItems(response.data);
            } catch (error) {
                console.error('Error fetching sold items:', error);
            }
        };

        fetchSoldItems();
    }, []);

    const handleAddSold = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/sold', {
                itemName,
                quantity,
                amount,
            });
            alert('Sold item recorded successfully');
            // Clear input fields
            setItemName('');
            setQuantity(0);
            setAmount('');
            setShowForm(false); // Hide form after submission
            // Fetch the updated list of sold items
            const response = await axios.get('http://localhost:5000/api/sold');
            setSoldItems(response.data);
        } catch (error) {
            alert(`Error recording sold item: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Sold Items Management</h2>
            
            {/* Add Item Button */}
            <button 
                style={styles.button} 
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : 'Add Item'}
            </button>

            {/* Form for adding sold items */}
            {showForm && (
                <form onSubmit={handleAddSold} style={styles.form}>
                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
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
                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
                        Quantity:
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
                        Amount:
                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </label>
                    <div style={styles.buttonContainer}>
                        <button type="submit" style={styles.button}>Record Sold Item</button>
                    </div>
                </form>
            )}

            <h3>Sold Items List</h3>
            <table style={styles.table}>
                <thead style={styles.tableHeader}>
                    <tr>
                        <th style={styles.th}>Item Name</th>
                        <th style={styles.th}>Quantity</th>
                        <th style={styles.th}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {soldItems.length > 0 ? (
                        soldItems.map((item, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{item.itemName}</td>
                                <td style={styles.td}>{item.quantity}</td>
                                <td style={styles.td}>{item.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Sold;
