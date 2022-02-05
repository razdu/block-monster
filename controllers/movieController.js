const mongoose = require("mongoose");
const Movie = require("../models/movie");

const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        Movie.find({})
            .then((movies) => resolve(movies))
            .catch((err) => reject(err));
    });
};
const insertOneMovie = (movieData) => {
    return new Promise((resolve, reject) => {
        const movie = new Movie(movieData);
        movie
            .save()
            .then((movie) => resolve(movie))
            .catch((err) => reject(err));
    });
};

const getOneMovie = (id) => {
    return new Promise((resolve, reject) => {
        Movie.findById(id)
            .then((movie) => resolve(movie))
            .catch((err) => reject(err));
    });
};

const updateMovie = (id, movieData) => {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate(id, movieData)
            .then((movie) => resolve(movie))
            .catch((err) => reject(err));
    });
};

const deleteMovie = (id) => {
    console.log(`delete ${id}`);
    return new Promise((resolve, reject) => {
        Movie.findByIdAndDelete(id)
            .then((movie) => resolve(movie))
            .catch((err) => reject(err));
    });
};

module.exports.getAllMovies = getAllMovies;
module.exports.insertOneMovie = insertOneMovie;
module.exports.getOneMovie = getOneMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovie = deleteMovie;
