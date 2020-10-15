const express = require('express');
const mypageController = require('../controllers/mypage');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

// 내정보 조회 
router.get('/', jwtMiddleware, mypageController.getUserInfo);

// // 로그인
// router.post('/login', mypageController.postLogin);


// //로그아웃
// router.post('/logout', mypageController.postLogout);


module.exports = router;


