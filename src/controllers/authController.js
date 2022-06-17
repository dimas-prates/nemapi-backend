const express = require("express");
// Crypt/Decrypt password
const bcrypt = require("bcryptjs");
// Generate pass token
const jwt = require("jsonwebtoken");
//Importing random hash
const authConfig = require("../config/auth.json");
// data from db to manipulate
const User = require("../models/User");
// Controll/Indicate router
const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "User already exists" });
    }
    const user = await User.create(req.body);
    user.password = undefined;
    // return res.send({ user });
    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: "Registration Failed" });
  }
});
router.post("/athenticate", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ erro: "Invalid password" });
  }
  // removed pass for reponse
  user.password = undefined;

  // generate token
  // const token = jwt.sign({ id: user.id }, authConfig.secret, {
  //   expiresIn: 86400,
  // });
  // res.send({ user, token });
  res.send({ user, token: generateToken({ id: user.id }) });
});
module.exports = (app) => app.use("/auth", router);
