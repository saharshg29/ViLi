const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const genre = require("./controller/genre");
const customer = require("./controller/customer");
const movie = require("./controller/movie");
const rental = require("./controller/rental");
const user = require("./controller/user");
const auth = require("./controller/auth");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();

mongoose
  .connect("mongodb://localhost/VidoLy")
  .then(console.log("Connected successfull with MongoDB..."))
  .catch((err) => console.error(`Connection with MongoDB failed ${err}`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/genre", private, genre);
app.use("/api/customer", customer);
app.use("/api/movie", movie);
app.use("/api/rental", rental);
app.use("/api/user", user);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send(
    "Hello world.... Now you are looking at our homepage... Welcome to homepage"
  );
  console.log("On homepage");
});

function private(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.PRIVATE_TOKEN);
    req.user = verified;

    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

app.listen(5500);
