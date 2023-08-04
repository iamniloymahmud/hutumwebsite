const { imageModel, imageYearsModel } = require("../models/mainModels");

const getYear = async (req, res, next) => {
  try {
    const data = await imageYearsModel
      .find({})
      .sort({ year: -1 })
      .select("-_id");
    res.status(200).json(data);
  } catch (error) {
    next(error.message);
    console.log(error);
  }
};

const getImageByYear = async (req, res, next) => {
  try {
    const { year, page : pageNumber } = req.body;
    console.log(req.body);
    const pageSize = 12;
    const data = await imageModel
      .find({ year: year })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select("-_id");
    res.status(200).json(data);
  } catch (error) {
    next(error.message);
    console.log(error);
  }
};

module.exports = {
  getYear,
  getImageByYear,
};
