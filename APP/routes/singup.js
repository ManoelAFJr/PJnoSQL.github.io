const express = require('express');
const passport = require('passport');
const User = require('../models/person')
const singUp = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.flash('info', 'You must log in to gain access!');
      res.redirect('/login');
    }
}

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