const User = require('../models/user');
const bcrypt = require('bcrypt');


//회원가입
exports.postRegister = (req, res) => {
  const { username, password, realname, unit, pro } = req.body;
  User.findByUsername(username)
    .then((user) => {
      // 이미 가입된 경우
      if (user) {
        return res.status(409).json({
          message: 'User exists',
        });
      } else {
        // 비밀번호 암호화
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              username: username,
              password: hash,
              realname: realname,
              unit: unit,
              pro: pro,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                // token 설정
                try {
                  const token = user.generateToken();
                  res
                    .cookie('access_token', token, {
                      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
                      httpOnly: true,
                    })
                    .status(201)
                    .json({
                      message: 'Auth successful',
                    });
                } catch (err) {
                  console.log('fail', err);
                  return res.status(500).json({
                    error: err,
                  });
                }
              })
              .catch((err) => {
                return res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};


//로그인
exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username)
    .exec()
    .then((user) => {
      // 없는 아이디인경우
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      //비밀번호 확인
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          // 토큰 발행
          const token = user.generateToken();
          return res
            .cookie('access_token', token, {
              maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
              httpOnly: true,
            })
            .status(200)
            .json({
              message: 'Auth successful',
            });
        }
        return res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//로그아웃
exports.postLogout = (req, res) => {
  //쿠키를 비우기
  res.cookie('access_token');
  res.status(204).json({
    message: 'logout',
  }); // No Content
};
