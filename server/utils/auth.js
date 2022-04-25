require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const expiration = process.env.EXPIRATION;

module.exports = {
  authMiddleware: function ({ req, next }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    console.log("req.headers.authorization", req.headers.authorization);

    if (token) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, {
        maxAge: expiration,
      });

      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },

  signToken: function ({ email, _id }) {
    const payload = { email, _id };

    return jwt.sign({ data: payload }, secret, {
      expiresIn: expiration,
    });
  },
};
