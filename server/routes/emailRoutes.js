const express = require('express');
const { mailCheck, mailCheckResults, results } = require('../controller/addEmail');
const emailRouter = express.Router();

emailRouter.post('/', mailCheck, mailCheckResults, results);

module.exports = {
    emailRouter,
}