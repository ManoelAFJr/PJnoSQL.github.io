require('dotenv').config();
const mongoose = require('mongoose')


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(
    `mongodb+srv://${process.env.ATLAS_USER}:`+
    `${process.env.ATLAS_PASSWORD}`+
    `@${process.env.ATLAS_HOST}/?retryWrites=true&w=majority`);
  }

console.log('Sucess conect mongoDB');

module.exports = mongoose;
