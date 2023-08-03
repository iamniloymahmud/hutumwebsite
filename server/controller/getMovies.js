const { moviesModel } = require("../models/mainModels");

const getHeroMovies = async (req, res, next) => {
  try {
    const movieData = await moviesModel
      .find()
      .sort({ release_date: -1 })
      .limit(5)
      .select("-msg_id");
    res.status(200).json(movieData);
  } catch (error) {
    next(error.message);
    console.log(error.message);
  }
};

const getAllMovies = async (req, res, next) => {
  try {
    const { pageNumber } = req.body;
    console.log(pageNumber);
    const pageSize = 12;
    const movieData = await moviesModel
      .find({})
      .sort({ release_date: -1 })
      .skip(((pageNumber-1) * pageSize))
      .limit(pageSize)
      .select("-msg_id");
    res.status(200).json(movieData);

  } catch (error) {
    next(error.message);
    console.log(error.message);
  }
};

const searchMovies = async (req, res, next) => {
  try {
    const { search } = req.body;
    const movieData = await moviesModel
      .find(
        { $text: { $search: `${search}` } },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(5)
      .select("-msg_id");
    res.status(200).json(movieData);
  } catch (error) {
    next(error.message);
    console.log(error.message);
  }
};

const popularMovies = async (req,res,next) => {
    try {
        const { search } = req.body;
        const movieData = await moviesModel
          .find({})
          .sort({ counter: -1 })
          .limit(4)
          .select("-msg_id");
        res.status(200).json(movieData);
      } catch (error) {
        next(error.message);
        console.log(error.message);
      }
}

module.exports = {
  getHeroMovies,
  getAllMovies,
  searchMovies,
  popularMovies
};
