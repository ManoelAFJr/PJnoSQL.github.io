const mongoose = require('../data/db');

const personSchema = new mongoose.Schema({
    name: String,
    last_name: String,
    phone: {type: String, unique: true},
    email: {type: String, unique: true}
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;