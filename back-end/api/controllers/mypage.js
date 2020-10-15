const User = require('../models/user');

// 유저 정보 얻기
exports.getUserInfo = (req, res) => {
  const user = req.userData;
  const { username, realname, unit, pro } = user;
  res.status(200).json({
    username: username,
    realname: realname,
    unit: unit,
    pro: pro,
  });
};

//사용자 정보변경
exports.patchUserInfo = (req, res) => {
  //find User Id
  const user = req.userData;
  const userId = user._id;
  const { unit } = req.body;
  // 변경된 유저 정보
  const updatedInfo = {
    unit,
  };
  //변경
  User.findByIdAndUpdate(userId, {
    $set: updatedInfo,
  })
    .exec()
    .then((result) => {
      const newUser = new User({
        ...result,
        unit  
      });
      const token = newUser.generateToken();
      res
        .cookie('access_token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .status(200)
        .json({
          unit,
        });
    })
    //예외처리
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
