const express=require('express')
const app=express();
const User=require('./Backend/Models/user');
const Expense=require('./Backend/Models/expense');
const Order=require('./Backend/Models/order');
const forgotpassword=require('./Backend/Models/forgotPasswordRequest');
const path=require('path')
const https=require('https');



const premiumRoutes=require('./Backend/Routes/premium')
const passwordRoutes=require('./Backend/Routes/password')

const bodyParser=require('body-parser')
const sequelize=require('./Backend/util/database');
const userRoutes=require('./Backend/Routes/user')
const cors=require('cors')
const helmet=require('helmet')
const compression=require('compression')
const morgan=require('morgan')
const fs=require('fs')

const expenseRoutes=require('./Backend/Routes/expense')

app.use(cors());

const privateKey=fs.readFileSync('server.key')
const certificate=fs.readFileSync('server.cert')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/expense',expenseRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',passwordRoutes);

const accessLogStream=fs.createReadStream(path.join(__dirname,'access.log'),
{flags:'a'}
);
app.use(userRoutes);
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}));

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
    app.listen(3000)
})
.catch(err=>{
    console.log(err);
})
