import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Predefined categories for selection
    const predefinedCategories = [
        "Electronics",
        "Clothes",
        "Books",
        "Shoes",
        "Cosmetics",
        "Others"
    ];

    // Fetch categories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('http://localhost:3000/api/categories')
            .then((response) => {
                const validatedCategories = response.data.map((category) => ({
                    ...category,
                    image: category.image || 'default-image.jpg', // Fallback for missing images
                }));
                setCategories(validatedCategories);
                console.log(validatedCategories)
                setError('');
            })
            .catch((err) => {
                setError('Failed to load categories');
            });
    };

    // Handle adding a new category
    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategoryName || !newCategoryImage) {
            setError('Please provide both name and image for the new category.');
            return;
        }

        // Check if the file is an image
        const fileType = newCategoryImage.type.split('/')[0];
        if (fileType !== 'image') {
            setError('The file must be an image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', newCategoryName);
        formData.append('image', newCategoryImage);

        axios.post('http://localhost:3000/api/categories/add', formData)
            .then((response) => {
                setCategories([...categories, response.data]);
                setNewCategoryName('');
                setNewCategoryImage(null);
                setSuccess('Category added successfully');
                setError('');
                setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
            })
            .catch((err) => {
                setError('Failed to add category');
                setSuccess('');
            });
    };

    // Handle deleting a category with double confirmation
    const handleDeleteConfirmation = (id) => {
        const firstConfirmation = window.confirm("Are you sure you want to delete this category?");
        if (firstConfirmation) {
            const secondConfirmation = window.confirm("This action is irreversible. Do you still want to proceed?");
            if (secondConfirmation) {
                handleDeleteCategory(id);
            }
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/categories/remove/${id}`, { method: "DELETE" });
            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                fetchCategories(); // Refresh categories
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className="content">
            <h2>Categories</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            {/* Table for displaying all categories */}
            <div className="card">
                <div className="card-header">All Categories</div>
                <div className="card-body">
                    {categories.length > 0 ? (
                        <table className="category-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category.id}>
                                        <td>{index + 1}</td>
                                        <td>{category.shopCategory}</td>
                                        <td>
                                            <img
                                                src={`http://localhost:3000/${
                                                    category.shopImage && category.shopImage.startsWith('/')
                                                        ? category.shopImage.slice(1)
                                                        : category.shopImage
                                                }`}
                                                alt={category.shopCategory || 'Category'}
                                                className="table-category-image"
                                            />
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteConfirmation(category.id)}
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

            {/* Add new category form */}
            <div className="card">
                <div className="card-header">Add New Category</div>
                <div className="card-body">
                    <form onSubmit={handleAddCategory}>
                        <div className="form-group">
                            <label htmlFor="category-select">Select Category</label>
                            <select
                                id="category-select"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                required
                            >
                                <option value="">Select a category</option>
                                {predefinedCategories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newCategoryImage">Category Image</label>
                            <input
                                type="file"
                                id="newCategoryImage"
                                accept="image/*"
                                onChange={(e) => setNewCategoryImage(e.target.files[0])}
                                required
                            />
                        </div>
                        <button type="submit" className="btn">Add Category</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
