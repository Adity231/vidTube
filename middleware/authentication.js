const jwt = require('jsonwebtoken');

const User = require('../Models/user');


const auth = async(req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, 'its my secret key');
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error });
    }
};
module.exports = auth;