require("../data-access-layer/dal");
const flightModel = require("../models/flight-model");

//get all orders
function getAllFlightsAsync() {
    return flightModel.find().exec();
}

function getAllFlightsByDateAndLocationAsync({ fromLocation, toLocation, flightDate }) {
    return flightModel.find({ fromLocation, toLocation, flightDate }).exec();
}

function getAllFlightsByLocationAsync({ fromLocation, toLocation }) {
    return flightModel.find({ fromLocation, toLocation }).exec();
}

function getSpecifFlightByIdAsync(_id) {
    return flightModel.findOne({ _id }).exec();
}

module.exports = {
    getAllFlightsAsync,
    getSpecifFlightByIdAsync,
    getAllFlightsByDateAndLocationAsync,
    getAllFlightsByLocationAsync,
}