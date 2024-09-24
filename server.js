require('dotenv').config();
const express=require('express');
const appServer=express();
const PORT=process.env.PORT||5700;
const session=require('express-session');
const flash=require('connect-flash');
const cookieParser=require('cookie-parser');
const dbConnection=require('./app/config/db');

const productRouter=require('./app/router/productRouter');
const userRouter=require('./app/router/userRouter');

dbConnection();
appServer.set("view engine","ejs");
appServer.set("views","views");

appServer.use(express.urlencoded({extended:true}));
appServer.use('/Public',express.static('Public'));
appServer.use('/uploads',express.static('uploads'));

appServer.use(session({
    secret:'secret9h6f738hs829ty237ht7hsuj',
    resave:false,
    saveUninitialized:false
}))

appServer.use(flash());
appServer.use(cookieParser());

appServer.use(productRouter);
appServer.use(userRouter);
appServer.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`); 
});