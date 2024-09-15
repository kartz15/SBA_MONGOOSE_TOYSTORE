// const mongoose = require("mongoose")

// const toysSchema = new mongoose.Schema({
//     name: String,
//     type: String,
//     url:  String,
//     favorite : String
// })

// const Toys = mongoose.model("Toys", toysSchema)

// module.exports = Toys

const mongoose = require("mongoose");

// Define the schema for toys
const toysSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    },
    url: { 
        type: String, 
        required: true 
    },
    favorite: { 
        type: Boolean, 
        default: false 
    }
});

// Create a model from the schema
const Toys = mongoose.model("Toys", toysSchema);

module.exports = Toys;
