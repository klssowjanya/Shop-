import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styles for the Purchase component
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
    card: {
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        width: '60%', // Adjust the width of the card
        margin: '20px auto', // Center the card
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '10px',
        width: '100%',
    },
    input: {
        marginBottom: '10px',
        width: '200px', // Input field width
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    label: {
        fontSize: '16px',
        marginBottom: '5px',
        display: 'block',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '10px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
};

const Purchase = () => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState(0);
    const [purchaseItems, setPurchaseItems] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchPurchaseItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/purchase');
                setPurchaseItems(response.data);
            } catch (error) {
                console.error('Error fetching purchase items:', error);
            }
        };

        fetchPurchaseItems();
    }, []);

    const handleAddPurchase = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/purchase', {
                itemName,
                quantity,
                amount,
            });
            alert('Purchase item recorded successfully');
            setItemName('');
            setQuantity(0);
            setAmount(0);
            setShowForm(false); // Hide form after submission

            // Fetch the updated list of purchase items
            const response = await axios.get('http://localhost:5000/api/purchase');
            setPurchaseItems(response.data);
        } catch (error) {
            alert(`Error recording purchase item: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Purchase Items Management</h2>

            {/* Button to Show Form */}
            <button 
                style={styles.button} 
                onClick={() => setShowForm(true)}
            >
                Add Item
            </button>

            {/* Card for the Form */}
            {showForm && (
                <div style={styles.card}>
                    <h3>Add Purchase Item</h3>
                    <form onSubmit={handleAddPurchase} style={styles.form}>
                        <div>
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
                        <div>
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
                        <div>
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
                            <button type="submit" style={styles.button}>Record Purchase Item</button>
                            <button type="button" onClick={() => setShowForm(false)} style={styles.button}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <h3>Purchase Items List</h3>
            <table style={styles.table}>
                <thead style={styles.tableHeader}>
                    <tr>
                        <th style={styles.th}>Item Name</th>
                        <th style={styles.th}>Quantity</th>
                        <th style={styles.th}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseItems.length > 0 ? (
                        purchaseItems.map((item) => (
                            <tr key={item._id}>
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

export default Purchase;
