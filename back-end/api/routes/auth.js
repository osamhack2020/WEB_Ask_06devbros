const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// router.get('/', (req, res) => {
//     res.status(201).json({message: "get / success"});
// });
// router.post('/register', (req, res) => {
//     const { username, password } = req.body;
//     res.status(201).json({message: "register post success", username: username, password: password});
// });
// router.post('/register', authController.postLogin);

// router.post('/login', authController.postLogin);


module.exports = router;