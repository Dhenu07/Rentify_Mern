require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const connection=require('./DB/dbConn');
const {authRoute,sellerRoute,userRoute}=require('./Routes')

connection();

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true,
}))
app.use(cookieParser());

app.use('/auth',authRoute);
app.use('/seller',sellerRoute);
app.use('/user',userRoute);
app.listen(process.env.PORT,()=>{
    console.log('Listening on port '+process.env.PORT)
})