// src/components/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [error, setError] = useState(null); // State for error messages
    const [success, setSuccess] = useState(null); // State for success messages
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle registration
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent form submission

        setError(null); // Clear any previous errors
        setSuccess(null); // Clear any previous success messages

        try {
            // Send POST request to register a new user
            const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });

            // If successful, display success message
            setSuccess(response.data.message);

            // Clear form fields
            setEmail('');
            setPassword('');

            // Redirect to login after 2 seconds
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            // Check if the error is related to existing email
            if (error.response && error.response.status === 400) {
                setError('Email already exists. Please use a different email.');
            } else {
                // Handle other types of errors
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Register</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                <label style={styles.label}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <label style={styles.label}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Register</button>
                
                {/* Display error message if registration fails */}
                {error && <p style={styles.errorMessage}>{error}</p>}

                {/* Display success message if registration is successful */}
                {success && <p style={styles.successMessage}>{success}</p>}
            </form>
            <p style={styles.link}>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
};

// Inline CSS styles
const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    header: {
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    errorMessage: {
        color: 'red',
    },
    successMessage: {
        color: 'green',
    },
    link: {
        textAlign: 'center',
    },
};

export default Register;
