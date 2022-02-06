const mongoose = require("mongoose");

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
    originCountry: String
});

module.exports = mongoose.model("Movie", movieSchema);
