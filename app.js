const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  axios = require("axios");
const {
  getAllMovies,
  insertOneMovie,
  getOneMovie,
  updateMovie,
  deleteMovie,
} = require("./controllers/movieController");

const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/movies", (req, res) => {
  getAllMovies()
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err));
});
app.post("/movies", (req, res) => {
  insertOneMovie(req.body)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});
app.get("/movies/:id", (req, res) => {
  getOneMovie(req.params.id)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});
app.put("/movies/:id", (req, res) => {
  updateMovie(req.params.id,req.body)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});
app.delete("/movies/:id", (req, res) => {
  deleteMovie(req.params.id)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});


mongoose
  .connect("mongodb://127.0.0.1:27017/huhw")
  .then(
    app.listen(port, () =>
      console.log(`Example app listening on port http://localhost:${port}`)
    )
  );
