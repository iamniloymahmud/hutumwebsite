// Job Guru Server
// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const express = require('express');
const movieRouter = express.Router();


//Internal Imports
const {getHeroMovies, getAllMovies, searchMovies, popularMovies} = require('../controller/getMovies');

movieRouter.get('/hero', getHeroMovies);
movieRouter.post('/all', getAllMovies);
movieRouter.post('/search', searchMovies);
movieRouter.get('/popular', popularMovies);


module.exports = {
    movieRouter,
}