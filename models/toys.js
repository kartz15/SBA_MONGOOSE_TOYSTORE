const mongoose = require("mongoose")

const toysSchema = new mongoose.Schema({
    name: String,
    type: String,
    url:  String
})

const Toys = mongoose.model("Toys", toysSchema)

module.exports = Toys