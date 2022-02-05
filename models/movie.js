const mongoose = require("mongoose");
const { stringify } = require("querystring");
const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    cast: [],
    originCountry: { type: String, index: true }
});
module.exports = mongoose.model("Movie", movieSchema);
