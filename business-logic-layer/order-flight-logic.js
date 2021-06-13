require("../data-access-layer/dal");
const OrderFlightModel = require("../models/order-flight-model");

//get all orders
function saveOrderFlightAsync(orderFlight) {
    return orderFlight.save();
}

function getAllOrderFlightsByUserIdAsync(userId) {
    return OrderFlightModel.find({ userId }).populate("flight").exec();
}

module.exports = {
    saveOrderFlightAsync,
    getAllOrderFlightsByUserIdAsync,
}