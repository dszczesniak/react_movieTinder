const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("client/build"));

app.listen(3005, () => {
  console.log("Servers is ON");
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/tinder");
const { Movie } = require("./models/movie");



app.post("/api/recommendations", (req, res) => {
  const movie = new Movie(req.body);

  movie.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      movieId: doc._id
    });
  });
});

app.put("/api/recommendations/:id/:status", (req, res) => {
  let status = req.params.status;

  if (status === "accept" || "reject") {
    Movie.findOne({ _id: req.params.id }, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json(doc);
    });
  } else {
    return res.status(400).json({
      message: "Wrong call"
    });
  }
});

app.get("/api/recommendations", (req, res) => {
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);

  Movie.find()
    .skip(skip)
    .limit(limit)
    .exec((err, movies) => {
      if (err) return res.status(400).send(err);
      res.status(200).json(movies);
    });
});
