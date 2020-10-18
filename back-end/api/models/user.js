// 사용자들을 관리하는 데이터 모델

const mongoose = require('mongoose');

const { Schema } = mongoose;
const jwt = require('jsonwebtoken');

const userSchema = Schema({
  username: { type: String, required: true }, // username
  password: { type: String, required: true }, // pw
  realname: { type: String, required: true }, // 실명
  unit: { type: String, required: true }, // 소속부대
  pro: { type: Boolean, required: true  }, // 전문상담관 여부
  // room: {
  //   type: ObjectId,
  //   ref: 'Room'
  // }
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // 첫번째 파라미터엔 토큰 안에 집어넣고 싶은 데이터를 넣습니다
    {
      _id: this.id,
      username: this.username,
      realname: this.realname,
      unit: this.unit,
      pro: this.pro,
      // room: this.room
    },
    process.env.JWT_SECRET, // 두번째 파라미터에는 JWT 암호를 넣습니다
    {
      expiresIn: '7d', // 7일동안 유효함
    },
  );
  return token;
};

userSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

module.exports = mongoose.model('User', userSchema);
