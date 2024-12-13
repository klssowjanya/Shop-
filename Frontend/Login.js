// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            console.log('Login response:', response.data);
            setEmail('');
            setPassword('');
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div style={styles.loginContainer}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={styles.loginForm}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                    style={styles.input}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Login</button>

                {error && <p style={styles.errorMessage}>{error}</p>}
            </form>

            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>

            <p>
                <Link to="/reset-password">Forgot Password?</Link>
            </p>
        </div>
    );
};

const styles = {
    loginContainer: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: '10px',
    },
};

export default Login;
