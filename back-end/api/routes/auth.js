const express = require('express');
const authController = require('../controllers/auth');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

// 회원가입 
router.post('/register', authController.postRegister);

// 로그인
router.post('/login', authController.postLogin);


//로그아웃
router.post('/logout', jwtMiddleware, authController.postLogout);


module.exports = router;