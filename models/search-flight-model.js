const mongoose = require("mongoose");

const searchFlightSchema = mongoose.Schema({
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
    flightDate: Date,
},
    {
        versionKey: false,
        id: false
    });

const searchFlightModel = mongoose.model("searchFlightModel", searchFlightSchema, "Flights");

module.exports = searchFlightModel;
