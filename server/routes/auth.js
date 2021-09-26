const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const RSA_KEY_PRIVATE = fs.readFileSync("./rsa/key");

router.post("/signin", (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    //Si un user exist
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      //create a token
      const token = jwt.sign({}, RSA_KEY_PRIVATE, {
        algorithm: "RS256",
        subject: user._id.toString(),
      });
      res.status(200).json(token); //retourne a l'user un status 200 et la cle token
    } else {
      res.status(401).json("SignIn fail !");
    }
  });
});

router.post("/signup", (req, res) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
  });

  newUser.save((err) => {
    if (err) {
      res.status(500).json("erreur signup");
    }
    res.status(200).json("signup ok !");
  });
});
module.exports = router;
