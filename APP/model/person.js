const bcrypt = require("bcrypt-nodejs");
const { request } = require("express");
const mongoose = require('../database/bd');

const SALT_FACTOR = 10;

const personSchema =  mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    created: { type: Date, default: Date.now},
    telefone: String,
    displayName: String,
    bio: String,
});

const noop = function () {};

personSchema.pre("save", function (done) {
  const user = this;

  if (!user.isModified("password")) {
    return done();
  }

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return done(err);
    }
    bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
      if (err) {
        return done(err);
      }
      user.password = hashedPassword;
      done();
    });
  });
});

personSchema.methods.checkPassword = function (guess, done) {
  bcrypt.compare(guess, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

personSchema.methods.name = function () {
  return this.username || this.email;
};
const Person = mongoose.model('Person', personSchema);
module.exports = Person;