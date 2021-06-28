const mongoose = require("mongoose");

const FlightSchema = mongoose.Schema({
    fromLocation: {
        type: String,
        required: [true, "Missing From Location."],
        minLength: [2, "From Location must be minimum 2 chars."],
        maxLength: [50, "From Location can't exceed 50 chars."],
    },
    toLocation: {
        type: String,
        required: [true, "Missing To Location."],
        minLength: [2, "To Location must be minimum 2 chars."],
        maxLength: [50, "To Location can't exceed 50 chars."],
    },
    duration: {
        type: String,
        required: [true, "Missing duration."],
    },
    date: {
        type: Date,
        required: [true, "Missing flight date."],
    },
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [1, "Price cannot be negative."],
        max: [100000, "Price can't exceed 100000."]
    },
    imageName: String,
},
    {
        versionKey: false,
        id: false
    });

const FlightModel = mongoose.model("FlightModel", FlightSchema, "Flights");

module.exports = FlightModel;
