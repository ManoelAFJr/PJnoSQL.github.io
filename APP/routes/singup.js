const express = require('express');
const passport = require('passport');
const User = require('../model/person')
const singUp = express.Router();


singUp.get("/signup", function (req, res) {
  res.render("signup");
});

singUp.post(
  "/signup",
  function (req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        req.flash("error", "User existent.");
        return res.redirect("/signup");
      }

      const newUser = new User({
        username : username,
        email : email,
        password : password,
      });
      newUser.save(next);
    });
  },
  passport.authenticate("login", {
    successRedirect: "/edit",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

module.exports = singUp;