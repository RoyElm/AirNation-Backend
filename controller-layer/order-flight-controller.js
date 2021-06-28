const express = require("express");
const orderFlightLogic = require("../business-logic-layer/order-flight-logic");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const OrderFlightModel = require("../models/order-flight-model");

const router = express.Router();

//getting all ordered flights;
router.get("/:userId", verifyLoggedIn, async (request, response) => {
    try {
        const userId = request.params.userId;
        const orderedFlights = await orderFlightLogic.getAllOrderFlightsByUserIdAsync(userId);
        response.json(orderedFlights);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//getting all ordered flights;
router.post("/", verifyLoggedIn, async (request, response) => {
    try {
        const orderFlight = new OrderFlightModel(request.body);
        const error = orderFlight.validateSync();
        if (error) return response.status(400).send(error.message);
        const addedOrderFlight = await orderFlightLogic.saveOrderFlightAsync(orderFlight);
        response.status(201).json(addedOrderFlight);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})


module.exports = router;