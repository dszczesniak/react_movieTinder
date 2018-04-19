const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("client/build"));

app.listen(3005, () => {
  console.log("listening on port 3005");
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/tinder");
const { Movie } = require("./models/movie");

//POST//

app.post("/api/movie", (req, res) => {
  const movie = new Movie(req.body);

  movie.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      movieId: doc._id
    });
  });
});

//PUT//
app.put("/api/recommendations/:id/:status", (req, res) => {
  let status = req.params.status;

  if ((status === "accept") | "reject") {
    Movie.findOne({ _id: req.params.id }, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
        status,
        doc
      });
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "Wrong call"
    });
  }
});

//GET//

app.get("/api/movies", (req, res) => {
  Movie.find((err, movies) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(movies);
  });
});
