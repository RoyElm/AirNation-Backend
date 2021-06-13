require("../data-access-layer/dal");
const articleModel = require("../models/article-model");
const flightModel = require("../models/flight-model");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

// Add new Article- Admin only:
async function addNewArticleAsync(article, newImage) {
    const extension = path.extname(newImage.name);
    article.imageName = uuid.v4() + extension;
    await newImage.mv("upload/article-images/" + article.imageName);
    return article.save();
}

// Add new Article- Admin only:
async function addNewFlightAsync(flight, newImage) {
    const extension = path.extname(newImage.name);
    flight.imageName = uuid.v4() + extension;
    await newImage.mv("upload/flight-images/" + flight.imageName);
    return flight.save();
}

// Update Article- Admin only:
async function updateArticleAsync(article, newImage) {
    if (newImage) {
        const absolutePath = path.join(__dirname, "..", "upload/article-images/", article.imageName);
        if (await fs.existsSync(absolutePath)) {
            await fs.unlinkSync(absolutePath);
        }
        const extension = path.extname(newImage.name);
        article.imageName = uuid.v4() + extension;
        await newImage.mv("upload/article-images/" + article.imageName);
    }
    const info = await articleModel.updateOne({ _id: article._id }, article).exec();
    return info.n ? article : null;
}

// Update Flight- Admin only:
async function updateFlightAsync(flight, newImage) {
    if (newImage) {
        const absolutePath = path.join(__dirname, "..", "upload/flight-images/", flight.imageName);
        if (await fs.existsSync(absolutePath)) {
            await fs.unlinkSync(absolutePath);
        }
        const extension = path.extname(newImage.name);
        flight.imageName = uuid.v4() + extension;
        await newImage.mv("upload/flight-images/" + flight.imageName);
    }
    const info = await flightModel.updateOne({ _id: flight._id }, flight).exec();
    return info.n ? flight : null;
}


module.exports = {
    addNewArticleAsync,
    addNewFlightAsync,
    updateArticleAsync,
    updateFlightAsync
};
