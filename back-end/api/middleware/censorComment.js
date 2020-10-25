const client = require('../lib/comment');

module.exports = (req, res, next) => {
    const comment = req.body.comment;
    client
    .censorComment()
    .sendMessage({clientComment: comment })
    .then(result => {
        console.log(typeof(result.serverCensor));
      if (result.serverCensor) {
        next();
      } else {
        res.status(400).json({
            message: "Not Allowed Comment"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
          error: err
      });
    });
}