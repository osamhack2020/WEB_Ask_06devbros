const webSocket = require('./socket');

const app = require("./app");

const port = process.env.PORT || 4000;


const server = app.listen(port, () => {
    console.log(port, '번 포트에서 대기중');
  });
  
webSocket(server, app);
