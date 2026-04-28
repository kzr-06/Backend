const express = require("express");
const router = express.Router();

const authContollers = require('../controllers/authControllers')


router.get('/register',authContollers.getRegisterPage)
router.post('/register',authContollers.register)
router.get('/login',authContollers.getLoginPage)
router.post('/login',authContollers.login)
router.get('/logout',authContollers.logout)


module.exports = router