import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Sellers from './components/Sellers';
import Products from './components/Products';
import Settings from './components/Settings';
import OrdersTable from './components/OrdersTable';

const App = () => {
    return (
        <Router>
            <Navbar />
            
            <div className="container" style={{ padding: "20px" }}>
                <Routes>

                    {/* Default route → redirect to /dashboard */}
                    <Route path="/" element={<Navigate to="/dashboard" />} />

                    {/* Corrected routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/sellers" element={<Sellers />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<OrdersTable />} />
                    <Route path="/settings" element={<Settings />} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;
