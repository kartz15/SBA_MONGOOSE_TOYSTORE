const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Get all toys in JSON format
router.get('/allcategories-json', categoriesController.getAllCategoriesJson);

// Route to display the category form
router.get('/allcategories', categoriesController.renderAllCatergories);

// Route to display the category form
router.get('/categoryForm', categoriesController.getCategoryForm);

// Route to display the form for adding or editing a category
router.get('/categories/:id?', categoriesController.getCategoryForm);

// Route to handle form submission for adding, updating, or deleting a category
router.post('/categories', categoriesController.handleCategoryForm);

// Handle toy deletion
router.get('/deletecategory/:id', categoriesController.deleteCategory);


module.exports = router;
