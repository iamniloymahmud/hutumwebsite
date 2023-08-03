// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const imageSchema = mongoose.Schema({
    author: String,
    batch: String,
    dept: String,
    caption: String,
    description: String,
    date: Date,
    link: String,
    place_tag: String,
    year: Number,
});


//Model

const imageModel = mongoose.model('Images', imageSchema);


module.exports = {
    imageModel,
}