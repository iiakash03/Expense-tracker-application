const Razorpay=require('razorpay')
const Order=require('../Models/order')
const Expense=require('../Models/expense');
const User=require('../Models/user');
const sequelize=require('sequelize')

const purchasepremium=async(req,res)=>{
    try{
        var rzp=new Razorpay({
            key_id:'rzp_test_9BurSHeEmChzxM',
            key_secret:'EqLhfXu0J8RmG8ifA8wNxJiV'
        })

        rzp.orders.create({
            amount:2000,
            currency:"INR"
        },(err,order)=>{
            console.log(order)
            if(err){
                console.log(err);
            }
            req.user.createOrder({
                orderid:order.id,status:'PENDING'})
                .then(()=>{
                    return res.status(201).json({order,key_id:rzp.key_id})
                })
                .catch(err=>{
                    throw new Error(err);
                })
        })
    }catch(err){
        console.log(err);
        res.status(403).json({message:'Something went wrong',error:err})
    }
}

const updatetransactionstatus=async (req,res,next)=>{
    //console.log(req.status)
   await Order.update({
    paymentid:req.body.payment_id,
    status:'SUCCESSFULL'
   }, 
    {
    where:{
        orderid:req.body.order_id
    }
   })
   await req.user.update({
        ispremium:true
   })
   return res.status(200).json('payment done successfully');
}

const showLeaderBoard=async (req,res,next)=>{
    const username=await User.findAll({
        attributes:['name','total_expense']
    })
    res.send(username);
}


module.exports={
    purchasepremium,
    updatetransactionstatus,
    showLeaderBoard
}
