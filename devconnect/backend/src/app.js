const express=require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");
// dotenv.config();


const postRoutes=require('./routes/postRoutes');
const userRoutes = require("./routes/userRoutes");
const commentRoutes=require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

const app=express();

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// console.log(path.resolve(__dirname, '../src/views'));
app.use(express.static(path.join(__dirname, 'views/public')));
console.log(path.join(__dirname, 'views/public'));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const checkUser = require('./middlewares/checkUserMiddleware');
app.use(checkUser);

app.use('/auth',authRoutes);
app.use('/posts',postRoutes);
app.use("/users", userRoutes);
app.use('/comments',commentRoutes);
app.use('/dashboard', dashboardRoutes)

// Basic route
app.get('/', (req,res) => {
res.render('pages/landing');
});



module.exports=app;