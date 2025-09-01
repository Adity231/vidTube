const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieOptions = {
    httpOnly: true,
    secure:false,
    sameSite:true
};

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const {channelName, username, about, profilePic, password} = req.body;
        const isExist = await User.findOne({ username });
        if(isExist){
            res.status(400).json({ message: "Username already exists" });
        }
        else{
            let updatedpass = await bcrypt.hash(password, 10);
            const newUser = new User({ channelName, username, about, profilePic, password: updatedpass });
            await newUser.save();
            res.status(201).json({ message: "User created successfully", success: "yes", data: newUser });
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

exports.signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, 'its my secret key');
        res.cookie("token", token, cookieOptions);
        res.status(200).json({ message: "User signed in successfully", success: "yes",user, token });
    } catch (error) {
        res.status(500).json({ message: "Error signing in", error });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token", cookieOptions);
    res.status(200).json({ message: "User logged out successfully" });
};
