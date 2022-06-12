const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: String
    }
    
})


module.exports = mongoose.model("customers", CustomerSchema)