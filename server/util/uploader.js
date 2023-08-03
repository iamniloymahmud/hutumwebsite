const {
  moviesModel,
  imageModel,
  imageYearsModel,
} = require("../models/mainModels");
const axios = require("axios");
const moment = require("moment");

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
    const data = await moviesModel.find().sort({ counter: -1 });
    const download = data.reduce((prev, data) => {
      return (prev += data.counter);
    }, 0);
    console.log(download);
    console.log(moment(new Date("month-day-year")).format("DD MMMM, yyyy"));
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const updateImages = async () => {
  try {
    const sheetData = await axios.get(
      "https://sheetdb.io/api/v1/73kqajbpp8fb8"
    );
    for (let data of sheetData.data) {
      const isPresent = await imageModel.find({ link: data.link });
      if (isPresent?.length === 0 && data?.date !== "") {
        const year = moment(new Date(data.date)).format("yyyy");
        const wholeSome = await imageYearsModel.find({});
        const yearList = await imageYearsModel.find({
          label: year.toString(),
        });
        console.log(yearList.length);
        console.log(wholeSome.length);
        console.log(year);
        if (yearList?.length === 0) {
          console.log("hello");
          await imageYearsModel.create({
            label: year.toString(),
            year: parseInt(year),
          });
        }
        await imageModel.create({
          ...data,
          date: new Date(data.date),
          author: data.name,
          year: parseInt(year),
        })
      }
    }
  } catch (error) {
    // console.log(error.message);
  }
};

module.exports = {
  getData,
  getCounter,
  updateImages,
};
