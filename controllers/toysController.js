
const Toys = require('../models/toys');
const Favorite = require('../models/favorites'); 


// Get all toys in JSON format
exports.getAllToysJson = async (req, res) => {
    try {
        const toys = await Toys.find({});
        res.json(toys);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get all Favorites in JSON format
exports.getFavoritesJson = async (req, res) => {
    try {
        const favorite = await Favorite.find({});
        res.json(favorite);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Render EJS views for girls
exports.renderGirlToys = async (req, res) => {
    try {
        const toys = await Toys.find({type:'girls'});
        res.render('alltoys', { toys, type: 'All' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
// Render EJS views for boys
exports.renderBoyToys = async (req, res) => {
    try {
        const toys = await Toys.find({type:'boys'});
        res.render('alltoys', { toys, type: 'All' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
// Render EJS views for all toys
exports.renderAllToys = async (req, res) => {
    try {
        const toys = await Toys.find({});
        res.render('alltoys', { toys, type: 'All' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Render EJS views for favorites
exports.renderFavorites = async (req, res) => {
    try {
        const toys = await Toys.find({favorite:'true'});
        res.render('alltoys', {toys, type: 'All' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Add a new toy
exports.addToy = async (req, res) => {
    const { name, type, url, redirectTo } = req.body;
    const favorite ='false';
    if (!name || !type || !url) {
        return res.status(400).send(`Name ${name}, Type ${type}, and Image URL ${url} are required`);
    }
    try {
        const newToy = new Toys({ name, type, url ,favorite});
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
    const { name, url, type, favorite, redirectTo } = req.body;
    try {
        const updatedToy = await Toys.findByIdAndUpdate(toyId, { name, url, type ,favorite}, { new: true });
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
        await Favorite.deleteOne({ id_ref: toyId });
        if (!deletedToy) {
            return res.status(404).send('Toy not found');
        }
        const redirectTo = req.query.redirectTo || '/alltoys'; 
        res.redirect(redirectTo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//add favorites
exports.favoriteToy = async (req, res) => {
    const { redirectTo } = req.body;
    const toyId = req.params.id;
    const favoriteStatus = "true";

    try {
        const existingFavorite = await Favorite.findOne({ id_ref: toyId });
        if (existingFavorite) {
            await Toys.findByIdAndUpdate(toyId, { favorite: favoriteStatus }, { new: true });
        } else {
            const newFav = new Favorite({ id_ref: toyId });
            await newFav.save();
            await Toys.findByIdAndUpdate(toyId, { favorite: favoriteStatus }, { new: true });
        }
        const redirectUrl = redirectTo || '/alltoys';
        res.redirect(redirectUrl);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Add or update favorite status for a toy
// exports.favoriteToy = async (req, res) => {
//     const toyId = req.params.id;
//     const favorite = 'true';
//     try {
//         // Check if the toy is already a favorite
//         const existingFavorite = await Favorite.findOne({ id_ref: toyId });

//         if (existingFavorite) {
//             // If it's already a favorite, just update the toy's favorite status
//             await Toys.findByIdAndUpdate(toyId, { favorite: favorite }, { new: true });
//         } else {
//             // If it's not a favorite, create a new favorite record and update the toy's status
//             const newFav = new Favorite({ id_ref: toyId });
//             await newFav.save();
//             await Toys.findByIdAndUpdate(toyId, { favorite: favorite }, { new: true });
//         }

//         // Return a success response
//         res.json({ success: true });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
