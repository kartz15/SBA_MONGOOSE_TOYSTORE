const Category = require('../models/categories'); 

// Get all categories in JSON format
exports.getAllCategoriesJson = async (req, res) => {
    try {
        const catJson = await Category.find({});
        res.json(catJson);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Render EJS views
exports.renderAllCatergories = async (req, res) => {
    try {
    const categories = await Category.find({});
        res.render('allcategories', {categories});
    } catch (error) {
        res.status(500).send(error.message);
    }
  };
  
// Function to display a form for adding or editing a category
exports.getCategoryForm = async (req, res) => {
    try {
        let category = null;

        if (req.params.id) {
            category = await Category.findById(req.params.id);
        }
        res.render('categoryForm', { category });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

// // Function to handle form submission for adding, updating, or deleting a category
// exports.handleCategoryForm = async (req, res) => {
//     try {
//         const { id, name, description, action } = req.body;

//         if (action === 'Add') {
//             const newCategory = new Category({ name, description });
//             await newCategory.save();
//         } else if (action === 'Update') {
//             await Category.findByIdAndUpdate(id, { name, description });
//         } else if (action === 'Delete') {
//             await Category.findByIdAndDelete(id);
//         }
//         res.redirect('/allcategories');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server Error");
//     }
// };

// Function to handle form submission for adding, updating, or deleting a category
exports.handleCategoryForm = async (req, res) => {
    try {
        const { id, name, description, action } = req.body;

        if (action === 'Add') {
            // Check for duplicate name
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return res.status(400).send("Category name already exists");
            }

            const newCategory = new Category({ name, description });
            await newCategory.save();
        } else if (action === 'Update') {
            // Check for duplicate name excluding the current category
            const existingCategory = await Category.findOne({ name, _id: { $ne: id } });
            if (existingCategory) {
                return res.status(400).send("Category name already exists");
            }

            await Category.findByIdAndUpdate(id, { name, description });
        } else if (action === 'Delete') {
            await Category.findByIdAndDelete(id);
        }

        res.redirect('/allcategories');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


// Delete a toy
exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).send('Category not found');
        }
        const redirectTo = req.query.redirectTo || '/allcategories'; 
        res.redirect(redirectTo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

