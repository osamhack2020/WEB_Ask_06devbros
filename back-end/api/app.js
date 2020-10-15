// env파일 적용
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

// routes import
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const mypageRoutes = require('./routes/mypage');

const { MONGO_URI } = process.env;

// db 연결
mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connect success');
  })
  .catch((err) => {
    console.log(err);
  });

//for logging
app.use(morgan('dev'));
// for post request
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

// HANDLING CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// routes들 적용
app.use('/admin', adminRoutes);
app.use(authRoutes);
app.use('/mypage', mypageRoutes);

//404 handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
