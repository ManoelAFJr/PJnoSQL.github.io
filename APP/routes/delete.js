const express = require('express');
const User = require('../models/person')
const delet = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.flash('info', 'You must log in to gain access!');
      res.redirect('/login');
    }
}

delet.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});

delet.post("/delete/:email", function (req, res, next) {
  const email = req.params.email;
  User.deleteOne({ email: email}, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(404);
    }
    res.render("/", { user: user });
  });
});

delet.get("/delete", ensureAuthenticated, function (req, res) {
  res.render("delete");
}); 

delet.post("/delete", ensureAuthenticated, 
function(req, res, next){
  const email = req.body.email;
  const username = req.body.username;
 
   User.deleteOne({email: email, username: username}, function(err){
     if(err){
       next(err);
       return
     }
     if(User){
       req.flash("info", "User not found");
       return res.redirect("/delete");
     }
       req.flash("info", "User deleted!");
       return res.redirect("/");
   })
  }
)

module.exports = delet;