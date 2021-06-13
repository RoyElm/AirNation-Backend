const mongoose = require("mongoose");

const FlightSchema = mongoose.Schema({
    fromLocation: {
        type: String,
        required: [true, "Missing From Location."],
        minLength: [2, "From Location must be minimum 2 chars."],
        maxLength: [30, "From Location can't exceed 30 chars."],
    },
    toLocation: {
        type: String,
        required: [true, "Missing To Location."],
        minLength: [2, "To Location must be minimum 2 chars."],
        maxLength: [30, "To Location can't exceed 30 chars."],
    },
    description: {
        type: String,
        required: [true, "Missing Description."],
        minLength: [5, "Description must be minimum 5 chars."],
        maxLength: [500, "Description can't exceed 500 chars."],
    },
    hours: {
        type: Number,
        required: [true, "Missing number of hours."],
        min: [1, "Hours must be minimum 1 hour."],
        max: [30, "Hours maximum is 30 hours."],
    },
    flightDate: {
        type: Date,
        required: [true, "Missing flight date."],
    },
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Price cannot be negative."],
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
