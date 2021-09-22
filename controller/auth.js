"use strict";

const jwt = require("jsonwebtoken");
const express = require("express");
const dotenv = require('dotenv').config();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const model = require("../modle/user");

const authRoute = express.Router();

authRoute.get("/", async (req, res) => {
  // const user = await model.User.find().sort("name");
  res.send("Login Portal");
});

const schema = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().max(1024).min(8).required(),
});

authRoute.post("/", async (req, res) => {
  const { errr } = schema.validate(req.body);
  if (errr) return res.status(400).send("Validation failed");

  const userExist = await model.User.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send("Wrong Username or password");

  // console.log(userExist)

  const validPass = await bcrypt.compare(req.body.password, userExist.password);
  if (!validPass) return res.status(400).send("Wrong username or password");
  else {
    const token = await jwt.sign({_id: userExist._id}, process.env.PRIVATE_TOKEN);
    res.header('auth-token', token).send(token);
    res.send({id: userExist._id});
    res.status(200).send('Looged In')
  }
});

module.exports = authRoute;
