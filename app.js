const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    movieRoutes = require("./routes/movieRoute");
axios = require("axios");

const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", movieRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/huhw").then(app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`)));
