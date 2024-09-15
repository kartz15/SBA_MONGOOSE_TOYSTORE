
const express = require('express');
const router = express.Router();
const toysController = require('../controllers/toysController');

// Routes for homepage
router.get('/', (req, res) => {
    res.send('Welcome Home !!!');
});
router.get('/home', (req, res) => {
    res.render('Homepage');
});

// Get all toys in JSON format
router.get('/alltoys-json', toysController.getAllToysJson);

router.get("/favorites-json", toysController.getFavoritesJson);

// Render EJS views
router.get('/girltoys', toysController.renderGirlToys);
router.get('/boytoys', toysController.renderBoyToys);
router.get('/alltoys', toysController.renderAllToys);


// Render EJS views
router.get('/allfavorites', toysController.renderFavorites);

// Get form for adding a new toy
router.get('/add-toy', (req, res) => {
    res.render('addToy');
});

// Handle form submission to add a new toy
router.post('/add-toy', toysController.addToy);

// Get form for updating a toy
router.get('/updateToy/:id', toysController.getUpdateToyForm);

// Handle form submission to update a toy
router.post('/updateToy/:id', toysController.updateToy);

// Handle toy deletion
router.get('/deleteToy/:id', toysController.deleteToy);

// Handle favorite
router.get('/favoriteToy/:id', toysController.favoriteToy);

// // Route for handling favorite toy actions
// router.post('/favoriteToy/:id', toysController.favoriteToy);


module.exports = router;
