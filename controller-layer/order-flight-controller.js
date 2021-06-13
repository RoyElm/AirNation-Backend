const express = require("express");
const orderFlightLogic = require("../business-logic-layer/order-flight-logic");
const errorsHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const FlightModel = require("../models/flight-model");

const router = express.Router();

//getting all ordered flights;
router.get("/", verifyLoggedIn, async (request, response) => {
    try {
        const orderedFlights = await orderFlightLogic.getAllOrderFlightsByUserIdAsync();
        response.json(orderedFlights);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//getting all ordered flights;
router.post("/", verifyLoggedIn, async (request, response) => {
    try {
        const flight = new FlightModel(request.body);
        const error = flight.validateSync();
        if (error) return response.status(400).send(error.message);
        const addedFlight = await orderFlightLogic.saveOrderFlightAsync(flight);
        response.status(201).json(addedFlight);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})


module.exports = router;