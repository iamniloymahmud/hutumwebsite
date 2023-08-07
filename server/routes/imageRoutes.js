const express = require('express');
const { getYear, getImageByYear, photoUploader } = require('../controller/getImages');
const { uploadFile } = require('../middlewares/upload');
const { validationFinal, validatorCheck } = require('../middlewares/formValidator');
const imageRouter = express.Router();

imageRouter.get('/years', getYear);
imageRouter.post('/all', getImageByYear);
imageRouter.post('/upload',uploadFile,validatorCheck, validationFinal, photoUploader);

module.exports = {
    imageRouter,
}



