const express = require("express");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const errorsHelper = require("../helpers/errors-helper");
const articleLogic = require("../business-logic-layer/article-logic");
const path = require("path");
const router = express.Router();


//getting all articles;
router.get("/", async (request, response) => {
    try {
        const articles = await articleLogic.getAllArticlesAsync();
        response.json(articles);
    } catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
})

router.get("/:_id", verifyLoggedIn, async (request, response) => {
    try {
        const _id = request.params._id;
        const article = await articleLogic.getSpecifArticleByIdAsync(_id);
        response.json(article);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

//getting article images
router.get("/articleImages/:imageName", (request, response) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "/../upload/article-images", imageName)
        response.sendFile(absolutePath);
    } catch (error) {
        response.status(500).send(errorsHelper.getError(error));
    }
})

module.exports = router;
