const jwt = require('jsonwebtoken');
const User = require('../models/user');


// 유저가 권한이 있는지 확인
const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({
    message: "Auth Failed"
  });
  try {
    /* eslint-disable */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        overwrite: true
      });
    }    
    next();
  } catch (e) {
    return res.status(401).json({
        message: "Auth Failed"
    });
  }
};

module.exports = jwtMiddleware;
