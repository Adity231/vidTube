const express = require('express');
const router = express.Router();
const  userController = require('../Controllers/user');

router.post('/signup', userController.signup);
router.post("/login", userController.signin);
router.post("/logout", userController.logout);





module.exports = router;