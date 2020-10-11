// env파일 적용
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// routes import
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

const { PORT, MONGO_URL } = process.env;

//for logging
app.use(morgan("dev"));
// for post request
app.use(bodyParser.urlencoded({
    extended: false
  }));
  // parse application/json
app.use(bodyParser.json())

// routes들 적용
app.use("/admin", adminRoutes);
app.use(authRoutes);

//404error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// set port number
const port = PORT || 4000;

mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('connect success');
    app.listen(port, () => {
        console.log('Listening to port %d', port);
      });
    })
  .catch(err => {
    console.log(err);
  });