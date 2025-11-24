import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "active-link" : "";

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h2>Dasho Admin</h2>
            </div>

            <ul className="navbar-links">
                <li><Link className={isActive("/dashboard")} to="/dashboard">Dashboard</Link></li>
                <li><Link className={isActive("/sellers")} to="/sellers">Sellers</Link></li>
                <li><Link className={isActive("/products")} to="/products">Products</Link></li>
                <li><Link className={isActive("/orders")} to="/orders">Orders</Link></li>
                <li><Link className={isActive("/settings")} to="/settings">Settings</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
