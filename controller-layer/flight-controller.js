const express = require("express");
const flightLogic = require("../business-logic-layer/flight-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();
const searchFlightModel = require("../models/search-flight-model");

//getting all flights;
router.get("/", async (request, response) => {
    try {
        const flights = await flightLogic.getAllFlightsAsync();
        response.json(flights);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//getting all flights by specific date and location;
router.get("/flightByDate", async (request, response) => {
    try {
        const searchFlight = new searchFlightModel(request.body);
        const searchedFlights = await flightLogic.getAllFlightsByDateAndLocationAsync(searchFlight);
        response.json(searchedFlights);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

//getting all flights by location;
router.get("/flightByLocation", async (request, response) => {
    try {
        const searchFlight = new searchFlightModel(request.body);
        const searchedFlights = await flightLogic.getAllFlightsByLocationAsync(searchFlight);
        response.json(searchedFlights);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

router.get("/_id", verifyLoggedIn, async (request, response) => {
    try {
        const _id = request.params._id;
        const flight = await flightLogic.getSpecifFlightByIdAsync(_id);
        response.json(flight);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

//getting flight images
router.get("/flightImages/:imageName", (request, response) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "upload/flight-images", imageName);
        response.sendFile(absolutePath);
    } catch (error) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

module.exports = router;
