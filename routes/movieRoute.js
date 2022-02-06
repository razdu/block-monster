const movieRoutes = require("express").Router();
const axios = require("axios").default;
const { getAllMovies, insertOneMovie, getOneMovie, updateMovie, deleteMovie, getMoviesByName, getMoviesByDate, getMoviesByOrigin } = require("../controllers/movieController");
const fs = require("fs");
const imdbKey = process.env.IMDB_key,
    imdbURL = `https://imdb-api.com/API/SearchTitle/${imdbKey}/`;

movieRoutes.get("/", (req, res) => {
    res.redirect("/movies.html");
});

movieRoutes.get("/movies", (req, res) => {
    getAllMovies()
        .then((movies) => res.json(movies))
        .catch((err) => res.json(err));
});

movieRoutes.post("/movies", (req, res) => {
    insertOneMovie(req.body)
        .then((movie) => res.json(movie))
        .catch((err) => res.json(err));
});

movieRoutes.get("/movies/byName", (req, res) => {
    getMoviesByName()
        .then((movies) => res.json(movies))
        .catch((err) => console.log(err));
});

movieRoutes.get("/movies/byDate", (req, res) => {
    getMoviesByDate()
        .then((movies) => res.json(movies))
        .catch((err) => console.log(err));
});

movieRoutes.get("/movies/byOrigin", (req, res) => {
    getMoviesByOrigin()
        .then((movies) => res.json(movies))
        .catch((err) => console.log(err));
});

movieRoutes.get("/movies/getIMDB/:id", (req, res) => {
    getOneMovie(req.params.id)
        .then((movie) => {
            /* axios({
                method: "get",
                url: imdbURL+movie.name,
            }); */
            axios(imdbURL + movie.name)
                .then((imdbData) => res.json(imdbData.data))
                .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
});

movieRoutes.get("/movies/byId/:id", (req, res) => {
    getOneMovie(req.params.id)
        .then((movie) => res.json(movie))
        .catch((err) => res.json(err));
});
movieRoutes.get("/movies/download/:id", (req, res) => {
    getOneMovie(req.params.id)
        .then((movie) => res.json(movie))
        .catch((err) => res.json(err));
});

movieRoutes.put("/movies/:id", (req, res) => {
    updateMovie(req.params.id, req.body)
        .then((movie) => res.json(movie))
        .catch((err) => res.json(err));
});

movieRoutes.delete("/movies/:id", (req, res) => {
    deleteMovie(req.params.id)
        .then((movie) => res.json(movie))
        .catch((err) => res.json(err));
});

module.exports = movieRoutes;
