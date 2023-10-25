const { check, validationResult } = require("express-validator");
const axios = require("axios");

const mailCheck = [
  check("email").custom((value) => {
    const regex =
      /([a-z]+)(([0-9]{2})(25|23|15|29|01|07|09|03|13|11|19|05|27|31|21|17)([0-9]{3}))(@stud.kuet.ac.bd)/i;
    if (regex.test(value) == false) {
      throw new Error("Enter a Valid KUET Mail");
    }
    return true;
  }),
];

const mailCheckResults = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length > 0) {
    res.status(400).json(mappedErrors);
  } else {
    next();
  }
};

const results = async (req, res, next) => {
  try {
    const response = await axios.post(
      "https://educated-watery-aphid.glitch.me/email",
      {
        email: req.body.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json({
        email: {
            msg: response.data.msg,
        }
    })
  } catch (error) {
    console.log(error.response.data.msg);
    res.status(400).json({
      email: {
        msg: error.response.data.msg,
      }
    });
  }
};

module.exports = {
  mailCheck,
  mailCheckResults,
  results,
};
