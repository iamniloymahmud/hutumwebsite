const multer = require("multer");
const path = require("path");

function multerUploader(mimes, fileSize) {
  const folder = path.join(__dirname, '..');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName =
        file.originalname.replace(ext, "").toLowerCase().split(" ").join("-") +
        "-" +
        Date.now().toString();
        cb(null,fileName+ext);
    },
  });
  const upload = multer({
    storage: storage,
    limits:{
        fileSize: fileSize,
    },
    fileFilter: (req,file,cb) => {
        if(mimes.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error(`${file.mimetype} is not allowed to upload`))
        }
    }
  });
  return upload;
}

module.exports = {
  multerUploader,
};
