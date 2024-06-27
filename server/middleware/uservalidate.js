const jwt = require("jsonwebtoken");
require("dotenv").config();

const accountMiddleware = (req, resp, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (_id) {
        req.userId = _id;
        next();
      }
    } else {
      resp
        .status(401)
        .json({ success: false, message: "token expired, access denied" });
    }
  } catch (err) {
    resp.json({ success: false, message: err });
  }
};

 const checkRole = (requiredRole) => (req, res, next) => {
  const authToken = req.headers.authorization;
  const cookieToken = req?.cookies?.authorization;
  let token;
  if (authToken) {
    token = authToken;
  } else {
    token = cookieToken;
  }
 
  if (!token) {
    return res.status(403).json({
      error: {
        code: "FORBIDDEN_ACCESS",
        message:
          "Sorry, you do not have the necessary permissions to perform this action.",
        details: "Please contact your administrator for assistance.",
      },
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded || !decoded._id || decoded.role !== requiredRole) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN_ACCESS",
          message:
            "Sorry, you do not have the necessary permissions to perform this action.",
          details: "Please contact your administrator for assistance.",
        },
      });
    }
    req.userId = decoded._id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const isAdmin = checkRole("admin");
const isUser = checkRole("user");

module.exports = {accountMiddleware,isAdmin,isUser};