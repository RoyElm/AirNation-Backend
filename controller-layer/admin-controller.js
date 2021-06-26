const express = require("express");
const adminLogic = require("../business-logic-layer/admin-logic");
const verifyAdmin = require("../middleware/verify-admin");
const ArticleModel = require("../models/article-model");
const FlightModel = require("../models/flight-model");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

//add article admin only
router.post("/add-article", verifyAdmin, async (request, response) => {
    try {
        const article = new ArticleModel(request.body);
        const errors = article.validateSync();
        if (errors) return response.status(400).send(errors.message);
        if (!request.files.newImage) return response.status(400).send("Image required!");
        const addedArticle = await adminLogic.addNewArticleAsync(article, request.files.newImage);
        response.status(201).json(addedArticle);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

//update article admin only 
router.put("/update-article/:_id", verifyAdmin, async (request, response) => {
    try {
        const article = new ArticleModel(request.body);
        article._id = request.params._id;
        const updatedArticle = await adminLogic.updateArticleAsync(article, request.files ? request.files.newImage : null);
        if (!updatedArticle)
            return response.status(404).send(`Article not found please try again.`);
        response.json(updatedArticle);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

//add flight admin only
router.post("/add-flight", verifyAdmin, async (request, response) => {
    try {
        const flight = new FlightModel(request.body);
        const errors = flight.validateSync();
        if (errors) return response.status(400).send(errors.message);
        if (!request.files.newImage) return response.status(400).send("Image required!");
        const addedFlight = await adminLogic.addNewFlightAsync(flight, request.files.newImage);
        response.status(201).json(addedFlight);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

//update flight admin only 
router.put("/update-flight/:_id", verifyAdmin, async (request, response) => {
    try {
        const flight = new FlightModel(request.body);
        flight._id = request.params._id;
        const updatedFlight = await adminLogic.updateFlightAsync(flight, request.files ? request.files.newImage : null);
        if (!updatedFlight)
            return response.status(404).send(`Product not found please try again.`);
        response.json(updatedFlight);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


module.exports = router;