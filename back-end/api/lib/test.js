const client = require('./chat');
client
  .chatBot()
  .sendMessage({clientChat: 'ho' })
  .then(res => {
    answer = true;
    console.log(res.serverChat);
  })
  .catch(err => {
    console.log(err);
  });
  

console.log('Answer: ');