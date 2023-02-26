const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const sequelize=require('./Backend/util/database');
const userRoutes=require('./Backend/Routes/user')
const cors=require('cors')
const bcrypt=require('bcrypt');
const expenseRoutes=require('./Backend/Routes/expense')

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/expense',expenseRoutes);
app.use(userRoutes);


//app.use('/register',userController)

sequelize.sync().then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})