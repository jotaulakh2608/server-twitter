"use strict";

require("dotenv").config();

const path = require("path");
const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-twitter");
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, SESSION_SECRET } =
  process.env;
const port = process.env.PORT || 4000;
const app = express();
const routes = require("./routes/routes");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors());

passport.use(
  new Strategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "/return",
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use(
  require("express-session")({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

mongoose.connect('mongodb+srv://jotaulakh:Kingji30@cluster0.khyxise.mongodb.net/?retryWrites=true&w=majority', ()=>{
  try {
    console.log('connected');
  } catch (error) {
    console.log(error);
  }
})

app.use(passport.initialize());
app.use(passport.session());
app.use("/", routes);

app.listen(port);
