const express = require('express');
const passport = require('passport');
const User = require('../model/person')
const login = express.Router();



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