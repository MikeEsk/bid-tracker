const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenUtility(user_id) {
  //Creates a payload for jwt to convert into token
    const payload = {
    user: {
      id: user_id
    }
  };

  return jwt.sign(payload, process.env.jwt_SECRET_KEY, { expiresIn: "1h" });
}

module.exports = jwtGenUtility;