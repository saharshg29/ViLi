const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const _ = require("lodash");
const model = require("../modle/user");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const user = await model.User.find().sort("name");
  res.send(user);
});

const schema = Joi.object({
  name: Joi.string().min(2).max(255).required,
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().max(1024).min(8).required(),
});

userRouter.post("/", async (req, res) => {
  const { errr } = schema.validate(req.body);
  if (errr) return res.status(400).send('Validation failed');

  const userExist = await model.User.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send("User already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new model.User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    let savedUser = await user.save();
    res.send({user: user._id});
    // console.log(savedUser)
  } catch (error) {
    console.error(error);
  }
});


module.exports = userRouter;