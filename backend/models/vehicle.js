const mongoose = require("mongoose");

const VehicleShema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    brand: {
        type: String,
        unique: false,
        required: true
    },
    model: {
        type: String,
        unique: false,
        required: true
    },
    rentalCost: {
        type: Number,
        required: true
    },
    isRented: {
        type: Boolean,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    }
})

module.exports = mongoose.model("vehicles", VehicleShema)


