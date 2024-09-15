const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
   id_ref : String
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
