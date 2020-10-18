module.exports = (req, res, next) => {
    if(req.userData.pro === true){
        next();
    } else {
        res.status(401).json({
            message: "Not Qualified"
        });
    };
}