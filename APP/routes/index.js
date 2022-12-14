const express = require('express');
const passport = require('passport');
const User = require('../model/person');
const index = express.Router();


index.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

index.get("/", function (req, res, next) {
  User.find()
    .sort({ createdAt: "descending" })
    .exec(function (err, users) {
      if (err) {
        return next(err);
      }
      res.render("index", { users: users });
    });
});

  index.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

module.exports =  index;