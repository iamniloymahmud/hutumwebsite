const express = require('express');
const { getYear, getImageByYear } = require('../controller/getImages');
const imageRouter = express.Router();

imageRouter.get('/years', getYear);
imageRouter.post('/all', getImageByYear);

module.exports = {
    imageRouter,
}



