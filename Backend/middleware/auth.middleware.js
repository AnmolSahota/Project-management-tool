const jwt = require("jsonwebtoken");
let auth = (req, res, next) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, "native", function (err, decoded) {
    if (decoded) {
      req.body.managerId = decoded.id;
      next();
    } else {
      res.status(400).send("you are not Authorized");
    }
  });
};

module.exports = auth;
