const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const index = require("./routes/index"); //Fichier route principale

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://angularDyma:123123123@cluster0.tr2sv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {},
  (error) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("connection db ok");
    }
  }
);

app.use(index); //Fichier rooting principale

app.use(express.static(path.join(__dirname, "../public")));

//Cette ligne en dessous siginie que pour les requetes get
//nous renverons au client  le fichier index.html situé dans le dossier public
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
