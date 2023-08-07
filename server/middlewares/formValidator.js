const { check, validationResult } = require("express-validator");
const {unlink} = require('fs');
const path = require('path');

const validatorCheck = [
  check("name").isLength({ min: 1 }).withMessage("Please Enter Your Name").trim(),
  check("roll").custom((value) => {
    const reg =
      /(([0-9]{2})(25|23|15|29|01|07|09|03|13|11|19|05|27|31|21|17)([0-9]{3}))/;
      console.log(reg.test(value));
    if (!reg.test(value)) {
      throw new Error("Enter a valid KUET Roll");
    }
    return true;
  }),
  check("place").isLength({ min: 3}).withMessage("Please Enter a Valid Place").trim(),
  check("caption").isLength({ min: 1}).withMessage("Please Enter a Caption").trim(),
  check("date").isISO8601().toDate().withMessage("Enter a Valid Date").trim(),

];

const validationFinal = (req,res,next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if(Object.keys(mappedErrors).length === 0){
        next();
    }else{
        if(req.files.length > 0){
            unlink(path.join(__dirname, `../${req.files[0].filename}`), (err) => {
                if(err){
                    console.log(err);
                }
            })
        }
        res.status(400).json(mappedErrors);
    }
}

module.exports = {
    validatorCheck,
    validationFinal
}
