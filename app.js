const express=require('express')
const app=express();
const User=require('./Backend/Models/user');
const Expense=require('./Backend/Models/expense');
const Order=require('./Backend/Models/order');
const forgotpassword=require('./Backend/Models/forgotPasswordRequest');


const premiumRoutes=require('./Backend/Routes/premium')
const passwordRoutes=require('./Backend/Routes/password')

const bodyParser=require('body-parser')
const sequelize=require('./Backend/util/database');
const userRoutes=require('./Backend/Routes/user')
const cors=require('cors')

const expenseRoutes=require('./Backend/Routes/expense')

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/expense',expenseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',passwordRoutes);
app.use(userRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forgotpassword);
forgotpassword.belongsTo(User)


//app.use('/register',userController)

sequelize
.sync()
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})
