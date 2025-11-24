const Category = require("../models/categoryModel");

// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};

// ADD CATEGORY
exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        // Correct image path stored in DB
        const imagePath = `public/Images/${req.file.filename}`;

        const category = new Category({
            name,
            image: imagePath
        });

        const saved = await category.save();
        res.json(saved);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to add category" });
    }
};

// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json({ message: "Category deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: "Failed to delete category" });
    }
};
