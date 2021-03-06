const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const port = 3000;

const Home = require("../database/homes.js");
const Image = require("../database/images.js");

mongoose.set("useCreateIndex", true);
mongoose.connect(
  "mongodb+srv://hbib:hbib@cluster0.m3m3t.mongodb.net/BaftekHome?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "./react-client/dist"));
app.use(express.static("./react-client/dist"));

app.get("/api/images/:_id", (req, res) => {
  Image.find({ homeID: req.params._id }, (err, docs) => {
    res.send(docs);
  });
});

app.get("/api/homes/:_id", (req, res) => {
  Home.find({ _id: req.params._id }, (err, docs) => {
    res.send(docs);
  });
});

app.get("/api/homes", (req, res) => {
  Home.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/api/homes", (req, res) => {
  console.log("hey",req.body);
  Home.create(req.body)
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
  });

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
