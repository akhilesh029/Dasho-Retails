import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
            <div className="container">
                <Routes>
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
