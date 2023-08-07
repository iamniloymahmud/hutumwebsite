const { multerUploader } = require("../util/multerStorage");
const uploadFile = (req, res, next) => {
  const upload = multerUploader(
    ["image/webp", "image/jpeg", "image/png", "image/jpg"],
    1024 * 1024 * 15
  );
  upload.any()(req, res, (error) => {
    if (error) {
      console.log(error.message);
      res.status(400).json({
        file: {
          msg: error.message,
        },
      });
    } else {
      if (req.files.length === 0) {
        res.status(400).json({
          file: {
            msg: "Please Select a photo",
          },
        });
      } else {
        next();
      }
    }
  });
};

module.exports = {
  uploadFile,
};
