const { moviesModel } = require("../models/mainModels");
const axios = require("axios");

const sheetData = "https://sheetdb.io/api/v1/a5ven54rvh6g9";
// `https://api.themoviedb.org/3/find/${imdb_id}?api_key=${movie_api}&language=en-US&external_source=imdb_id`

const movie_api = "3d95778c722f8e6d9db3c1004e3d6912";
const getData = async () => {
  try {
    const movie = await axios.get(sheetData);
    const movieData = movie.data;
    let ara = [];
    for (let x of movieData) {
      if (x?.imdb_id != "" && x?.imdb_id?.[0] == "t") {
        ara.push({
          url: `https://api.themoviedb.org/3/find/${x?.imdb_id}?api_key=${movie_api}&language=en-US&external_source=imdb_id`,
          msg_id: parseInt(x?.msg_id),
        });
      }
    }
    for (let x of ara) {
      console.log(x.url);
      const data = await axios.get(x.url);
      console.log(data?.data?.movie_results?.[0]?.id);
      const id = data?.data?.movie_results?.[0]?.id;
      if (id) {
        const fi = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=3d95778c722f8e6d9db3c1004e3d6912`
        );
        const finalData = fi.data;
        await moviesModel.create({
          ...finalData,
          msg_id: x.msg_id,
        });
      }
    }
    console.log("success");
  } catch (error) {
    console.log(error.message);
  }
};

const getCounter = async () => {
  try {
    const data = await moviesModel.find().sort({ counter: -1 }).limit(8);
    const download = data.reduce((prev, data) => {
      return prev+=data.counter;
    }, 0)
    // console.log(download);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getData,
  getCounter,
};
