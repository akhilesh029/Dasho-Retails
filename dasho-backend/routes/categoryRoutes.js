const express = require("express");
const multer = require("multer");
const path = require("path");

const {
    getCategories,
    addCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Images");  // Correct folder
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    }
});

const upload = multer({ storage });

// Routes
router.get("/", getCategories);
router.post("/add", upload.single("image"), addCategory);
router.delete("/remove/:id", deleteCategory);

module.exports = router;
