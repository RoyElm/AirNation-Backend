require("../data-access-layer/dal");
const OrderFlightModel = require("../models/order-flight-model");

//get all orders
function saveOrderFlightAsync(orderFlight) {
    return orderFlight.save();
}

function getAllOrderFlightsByUserIdAsync(userId) {
    return OrderFlightModel.find({ userId }).populate("flight").exec();
}

function getOrderFlightBy_idAsync(_id) {
    return OrderFlightModel.findOne({ _id }).populate("flight").exec();
}

function deleteOrderFlightBy_idAsync(_id) {
    return OrderFlightModel.deleteOne({ _id }).exec();
}

module.exports = {
    saveOrderFlightAsync,
    getAllOrderFlightsByUserIdAsync,
    deleteOrderFlightBy_idAsync,
    getOrderFlightBy_idAsync
}