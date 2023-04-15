const express=require('express')
const app=express();
const mongoose = require('mongoose');
const User=require('./Backend/Models/user');
// const Expense=require('./Backend/Models/expense');
// const Order=require('./Backend/Models/order');
// const forgotpassword=require('./Backend/Models/forgotPasswordRequest');
const path=require('path')
// const https=require('https');

//const premiumRoutes=require('./Backend/Routes/premium')
//const passwordRoutes=require('./Backend/Routes/password')

const bodyParser=require('body-parser')
const userRoutes=require('./Backend/Routes/user')
const cors=require('cors')
const helmet=require('helmet')
const compression=require('compression')
const morgan=require('morgan')
const fs=require('fs')

const expenseRoutes=require('./Backend/Routes/expense')

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/expense',expenseRoutes);
// app.use('/premium',premiumRoutes);
// app.use('/password',passwordRoutes);
app.use('/user',userRoutes);

app.use((req,res)=>{
    console.log(req.url)
    res.sendFile(path.join(__dirname, `Backend/public/${req.url}`))
})

mongoose
.connect('mongodb+srv://Akash8958:Akash8958@cluster0.5oflop9.mongodb.net/Expensetracker')
.then(result => {
    app.listen(3000);
  console.log('Connected to MongoDB')
})
.catch(err => {
  console.log(err)
})

