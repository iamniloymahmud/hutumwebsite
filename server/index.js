// HUTUM Website
// Jaied Bin Mahmud
// KUET BME '18

//External Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { getData, getCounter } = require("./util/uploader");

//Internal Imports
const { movieRouter } = require("./routes/movieRoutes");
const { errorHandler, notFound } = require("./controller/errorHandlers");

//Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(cors());
// app.use((req, res, next) => {
//   if (req.headers.origin === process.env.allow) {
//     next();
//   }else{
//     res.status(401).json({
//         msg: 'You are forbidden to use this API',
//     })
//   }
// });
app.use((req,res,next) => {
  setTimeout(() => {
    next();
  }, 2000)
})

//Routers
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello from HUTUM 100 Team",
  });
});
app.use("/movies", movieRouter);

// getData();
getCounter();

//Error Handlers
app.use(notFound);
app.use(errorHandler);

//Connections
const port = process.env.port || 5000;
const mongoDB = process.env.mongoDB;

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(port, () => {
      console.log("Server is Running");
    });
  })
  .catch((error) => {
    console.log("Database connection failed");
    console.log(error);
  });
