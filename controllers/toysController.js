
const Toys = require('../models/toys');
const Category = require('../models/categories'); // Import Category model

// Get all toys in JSON format
exports.getAllToysJson = async (req, res) => {
    try {
        const toys = await Toys.find({});
        res.json(toys);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Render EJS views
exports.renderAllToys = async (req, res) => {
    try {
        const toys = await Toys.find({});
        res.render('alltoys', { toys, type: 'All' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Add a new toy
exports.addToy = async (req, res) => {
    const { name, type, url, redirectTo } = req.body;
    if (!name || !type || !url) {
        return res.status(400).send(`Name ${name}, Type ${type}, and Image URL ${url} are required`);
    }
    try {
        const newToy = new Toys({ name, type, url });
        await newToy.save();
        const redirectUrl = redirectTo || '/alltoys'; 
        res.redirect(redirectUrl);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get form for updating a toy
exports.getUpdateToyForm = async (req, res) => {
    const toyId = req.params.id;
    const redirectTo = req.query.redirectTo ; 
    try {
        const toy = await Toys.findById(toyId);
        if (!toy) {
            return res.status(404).send('Toy not found');
        }
        res.render('updateToy', { toy, redirectTo: redirectTo  });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update a toy
exports.updateToy = async (req, res) => {
    const toyId = req.params.id;
    const { name, url, type, redirectTo } = req.body;
    try {
        const updatedToy = await Toys.findByIdAndUpdate(toyId, { name, url, type }, { new: true });
        if (!updatedToy) {
            return res.status(404).send('Toy not found');
        }
        
        const redirectUrl = redirectTo || '/alltoys'; 
        res.redirect(redirectUrl);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete a toy
exports.deleteToy = async (req, res) => {
    const toyId = req.params.id;
    try {
        const deletedToy = await Toys.findByIdAndDelete(toyId);
        if (!deletedToy) {
            return res.status(404).send('Toy not found');
        }
        const redirectTo = req.query.redirectTo || '/alltoys'; 
        res.redirect(redirectTo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
