const express = require("express");
const Category = require("../model/category");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// =============================================== Multer Configuration ==========================================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Images"); // Define the folder to store images
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)); // Custom file naming
    },
});

const upload = multer({ storage });



// =============================================== Add Category Route ============================================
router.post("/add", upload.single("image"), async (req, res) => {
    const { name, description } = req.body;
    const imagePath = req.file ? `public/Images/${req.file.filename}` : null;

    try {
        // Check if the category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: "Category with this name already exists" });
        }

        // Create a new category
        const newCategory = new Category({
            name,
            description,
            image: imagePath, // Save the image path in the database
        });

        // Save the category to the database
        await newCategory.save();

        res.status(201).json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error, unable to add category" });
    }
});


//==========================================================fetch all category ==================================
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error, unable to fetch categories" });
    }
});


// =============================================== Remove Category ===============================================
router.delete("/remove/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Remove the image from the filesystem
        if (category.image) {
            const fs = require("fs");
            fs.unlink(category.image, (err) => {
                if (err) {
                    console.error("Error removing image file:", err);
                }
            });
        }

        // Delete the category from the database
        await category.deleteOne();

        res.status(200).json({ message: "Category removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error, unable to remove category" });
    }
});


// =============================================== Export Router ================================================
module.exports = router;
