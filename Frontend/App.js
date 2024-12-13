import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Adjust the path as needed
import Register from './components/Register'; // Adjust the path as needed
import Dashboard from './components/Dashboard'; // Adjust the path as needed
import Stock from './components/Stock'; // Adjust the path as needed
import Sold from './components/Sold'; // Adjust the path as needed
import Purchase from './components/Purchase'; // Adjust the path as needed
import Notes from './components/Notes'; // Adjust the path as needed

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/sold" element={<Sold />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/notes" element={<Notes />} />
        </Routes>
    );
}

export default App;
