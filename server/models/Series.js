// Job Guru Server
// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require("mongoose");

//Schema

const seriesSchema = mongoose.Schema({
  backdrop_path: String,
  first_air_date: Date,
  genres: [
    {
      id: Number,
      name: String,
    },
  ],
  id: Number,
  name: String,
  original_language: String,
  original_name: String,
  overview: String,
  poster_path: String,
  seasons: [
    {
      air_date: Date,
      episode_count: Number,
      id: Number,
      name: String,
      overview: String,
      poster_path: String,
      season_number: Number,
      msg_ids: [
        {
          episode_no: Number,
          msg_id: Number,
        }
      ],
    },
  ],
  tagline: String,
  vote_average: Number,
});

//Model

const seriesModel = mongoose.model("WebsiteSeries", seriesSchema);

module.exports = {
  seriesModel,
};
