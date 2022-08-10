const express = require('express');
const passport = require('passport');
const User = require('../model/person')
const login = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.flash('info', 'You must log in to gain access!');
      res.redirect('/login');
    }
}

login.get('/login', function (req, res) {
    res.render('login');
  });
  
 login.post(
    '/login',
    passport.authenticate('login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    })
  );

  login.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

module.exports = login ;