const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const getRegisterPage = (req,res)=>{
    res.render("pages/register");
}

// Register User
const register = async(req,res)=>{
    const {name,email,password} = req.body;

    const hashedPassword = await bcrypt.hash(password,12);
    await User.create({name,email,password : hashedPassword})

    res.redirect('/auth/login');
}

//Login Page
const getLoginPage = (req,res)=>{
    res.render('pages/login')
}

//Login User
const login = async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user) return res.send("User not found")

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) return res.send("Invalid Credentials")

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
    res.cookie("token",token);
    res.redirect('/dashboard')
}

//Logout
const logout = (req,res) =>{
    res.clearCookie("token")
    res.redirect('/auth/login')
}

module.exports = {getRegisterPage,register,getLoginPage,login,logout}