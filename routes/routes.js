"use strict";
const User = require("../model/twitter-user");
const express = require("express");
const passport = require("passport");
const router = express.Router();
const cors = require("cors");

const app = express();

app.use(cors());

router.get("/", async (req, res, next) => {
  const { user } = req;
  console.log(user);
  res.status(200).json(user)
  // try {
  //   // console.log(user.displayName, user._json.profile_image_url);
  //   const newUser = await User.create({
  //     name: user.displayName,
  //     photo: user._json.profile_image_url,
  //   });
  //   res.status(200).json(newUser);
  // } catch (error) {
  //   console.log(error);
  // }
});

router.get("/auth/login", passport.authenticate("twitter"));

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/return",
  passport.authenticate("twitter", {
    failureRedirect: "http://localhost:3000",
  }),
  async (req, res, next) => {
    res.redirect("/");
    const { user } = req;
  }
);
router.get("/all", async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
});
// router.get('/user', async function(req,res){
// const user = await User.find({})
// console.log(user);
// })

module.exports = router;
