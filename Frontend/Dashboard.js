import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use Link for navigation

// Inline CSS styles
const styles = {
    dashboard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center elements horizontally
        justifyContent: 'center', // Center elements vertically
        height: '100vh',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        position: 'relative', // Make the dashboard a positioned container
    },
    heading: {
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'center', // Center the title
        width: '100%', // Full width to align button
    },
    title: {
        fontSize: '2rem', // Larger font size
        fontWeight: 'bold', // Make it bold
        color: '#333', // Darker text color
    },
    logoutButton: {
        position: 'absolute', // Positioning it absolutely
        top: '20px', // Distance from the top
        right: '20px', // Distance from the right
        padding: '10px 20px',
        backgroundColor: '#f44336', // Red background for logout
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row', // Stack buttons vertically
        alignItems: 'center', // Center buttons horizontally
        gap: '20px', // Space between buttons
    },
    dashboardButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: 'none',
        borderRadius: '10px',
        backgroundColor: 'blue', // Green background
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
        textDecoration: 'none', // Remove underline
        width: '200px', // Fixed width for buttons
        transition: 'background-color 0.3s ease',
        height:'200px'
    },
    dashboardButtonHover: {
        backgroundColor: 'darkblue', // Darker green on hover
    },
    icon: {
        width: '180px', // Icon size
        height: '230px',
        marginBottom: '10px', // Space between icon and text
    },
};

const Dashboard = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleLogout = () => {
        // Logic for logout, like clearing session or token
        // alert('You have logged out.'); // Add your logout logic here
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <div style={styles.dashboard}>
            <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
            <div style={styles.heading}>
                <h1 style={styles.title}>Dashboard</h1>
            </div>
            <div style={styles.buttonContainer}>
                <Link to="/stock" style={styles.dashboardButton}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.dashboardButtonHover.backgroundColor)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.dashboardButton.backgroundColor)}>
                    <img src="stock.jpg" alt="Stock" style={styles.icon} />
                    Stock
                </Link>
                <Link to="/sold" style={styles.dashboardButton}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.dashboardButtonHover.backgroundColor)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.dashboardButton.backgroundColor)}>
                    <img src="sold.webp" alt="Sold" style={styles.icon} />
                    Sold
                </Link>
                <Link to="/purchase" style={styles.dashboardButton}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.dashboardButtonHover.backgroundColor)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.dashboardButton.backgroundColor)}>
                    <img src="purchase.png" alt="Purchase" style={styles.icon} />
                    Purchase
                </Link>
                <Link to="/notes" style={styles.dashboardButton}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.dashboardButtonHover.backgroundColor)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.dashboardButton.backgroundColor)}>
                    <img src="notes.jpg" alt="Notes" style={styles.icon} />
                    Notes
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;