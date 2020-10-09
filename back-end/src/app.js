require('dotenv').config();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


const { PORT, MONGO_URL } = process.env;

app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(express.static(path.join(__dirname, 'public')));


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