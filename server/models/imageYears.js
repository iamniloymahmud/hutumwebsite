// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require("mongoose");

//Schema

const imageYearsSchema = mongoose.Schema({
  label: String,
  year: Number,
});

//Model

const imageYearsModel = mongoose.model("ImageYears", imageYearsSchema);

module.exports = {
  imageYearsModel,
};
