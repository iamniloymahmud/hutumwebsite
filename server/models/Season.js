// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const seasonSchema = mongoose.Schema({
    id: Number,
    imdb_id: String,
    season_id: Number,
    episodes: [
        {
            msg_id: Number,
            episode_no: Number,
        }
    ] 
});


//Model

const seasonModel = mongoose.model('Seasons', seasonSchema);


module.exports = {
    seasonModel,
}