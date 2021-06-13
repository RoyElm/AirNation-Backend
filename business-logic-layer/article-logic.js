require("../data-access-layer/dal");
const articleModel = require("../models/article-model");

//get all orders
function getAllArticlesAsync() {
    return articleModel.find().exec();
}

function getSpecifArticleByIdAsync(_id) {
    return articleModel.findOne({ _id }).exec();
}

module.exports = {
    getAllArticlesAsync,
    getSpecifArticleByIdAsync,
}