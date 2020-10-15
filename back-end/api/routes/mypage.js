const express = require('express');
const mypageController = require('../controllers/mypage');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

// 내정보 조회 
router.get('/', jwtMiddleware, mypageController.getUserInfo);

// 내 정보 변경
router.patch('/edit', jwtMiddleware, mypageController.patchUserInfo);

module.exports = router;


