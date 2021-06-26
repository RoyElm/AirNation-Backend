const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
    author: {
        type: String,
        required: [true, "Missing author."],
        minLength: [2, "Author must be minimum 2 chars."],
        maxLength: [50, "Author can't exceed 50 chars."],
    },
    description: {
        type: String,
        required: [true, "Missing Description."],
        minLength: [5, "Description must be minimum 5 chars."],
        maxLength: [3000, "Description can't exceed 3000 chars."],
    },
    publishDate: {
        type: Date,
        required: [true, "Missing publish date."],
    },
    title: {
        type: String,
        required: [true, "Missing Title"]
    },
    imageName: String,
    featured: {
        type: Boolean,
        required: [true, 'missing featured']
    }
},
    {
        versionKey: false,
        id: false
    });

const ArticleModel = mongoose.model("ArticleModel", ArticleSchema, "Articles");

module.exports = ArticleModel;
