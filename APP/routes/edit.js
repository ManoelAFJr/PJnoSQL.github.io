const express = require("express");
const passport = require("passport");
const edit = express.Router();
const User = require('../models/person')


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('info', 'You must log in to gain access!');
    res.redirect('/login');
  }
}

edit.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

edit.get("/users/:username", function (req, res, next) {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(404);
    }
    res.render("profile", { user: user });
  });
});

edit.get("/edit", ensureAuthenticated, function (req, res) {
  res.render("edit");
});


edit.post("/edit", ensureAuthenticated, function (req, res, next) {
  req.user.telefone = req.body.telefone;
  req.user.displayName = req.body.displayname;
  req.user.bio = req.body.bio;
  req.user.save(function (err) {
    if (err) {
      next(err);
      return;
    }
    req.flash("info", "Upgrade sucess!");
    res.redirect("/");
  });
});

module.exports = edit;