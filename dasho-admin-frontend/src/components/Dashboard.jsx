import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/categories`);
            setCategories(res.data);
        } catch (err) {
            setError("Failed to load categories.");
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!newCategoryName || !newCategoryImage) {
            setError("Please provide name and image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", newCategoryName);
        formData.append("image", newCategoryImage);

        try {
            const res = await axios.post(`${BASE_URL}/api/categories/add`, formData);
            setCategories([...categories, res.data]);
            setSuccess("Category added successfully!");

            setNewCategoryName("");
            setNewCategoryImage(null);
        } catch (err) {
            setError("Failed to add category.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?"))
            return;

        try {
            const res = await axios.delete(`${BASE_URL}/api/categories/remove/${id}`);
            alert(res.data.message);
            fetchCategories();
        } catch (err) {
            alert("Failed to delete category.");
        }
    };

    // Build correct image URL
    const getImageURL = (imagePath) => {
        if (!imagePath) return "";
        return `${BASE_URL}/${imagePath.replace(/\\/g, "/")}`;
    };

    return (
        <div className="content">
            <h2>Categories</h2>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <div className="card">
                <div className="card-header">All Categories</div>
                <div className="card-body">
                    {categories.length > 0 ? (
                        <table className="category-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category._id}>
                                        <td>{index + 1}</td>
                                        <td>{category.name}</td>

                                        <td>
                                            <img
                                                src={getImageURL(category.image)}
                                                alt={category.name}
                                                className="table-category-image"
                                            />
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => handleDelete(category._id)}
                                                className="btn-delete"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No categories found</p>
                    )}
                </div>
            </div>

            {/* ADD CATEGORY FORM */}
            <div className="card">
                <div className="card-header">Add New Category</div>
                <div className="card-body">
                    <form onSubmit={handleAddCategory}>
                        <div className="form-group">
                            <label>Category Name</label>
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Enter category name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Category Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setNewCategoryImage(e.target.files[0])
                                }
                                required
                            />
                        </div>

                        <button type="submit" className="btn">
                            Add Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
