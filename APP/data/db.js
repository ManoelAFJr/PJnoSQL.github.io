require('dotenv').config();

const mongoose = require('mongoose');

main().catch(error => console.log(error));
async function main(){
    await mongoose.connect(
        `${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}`+
        `@${process.env.ATLAS_HOST}/?${process.env.ATLAS_URL}`
    );
};

console.log('Sucess conect mongoDB');
module.exports = mongoose;
