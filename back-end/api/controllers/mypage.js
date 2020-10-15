const User = require('../models/user');

exports.getUserInfo = (req, res) => {
    const user = req.userData;
    const { username, realname, unit, pro } = user;
    res.status(200).json({
        username: username,
        realname: realname,
        unit: unit,
        pro: pro
    });
}