const { response } = require('express');
const expense=require('../Models/expense');
const user=require('../Models/user');

const addExpense=async (req,res,next)=>{

    const price=req.body.price
    const description=req.body.description
    const category=req.body.category

    const totalprice=await user.findAll({
        attributes:['total_expense'],
        where:{
            id:req.user.id
        }

    })
    console.log(typeof (totalprice[0].dataValues.total_expense))
    const updatedPrice=+totalprice[0].dataValues.total_expense+ +price;
    console.log(updatedPrice);

    user.update(
        {total_expense:updatedPrice},
        {where:{id:req.user.id}}
    )

    expense.create({
        price:price,
        category:category,
        description:description,
        userId:req.user.id,   
    })
    .then((response)=>{
        res.send('OK');
    })
    .catch(err=>{
        res.send(err);
    })
}


const getExpenses=(req,res,next)=>{

    expense.findAll({
        where:{
            userId:req.user.id
        }
    })
    .then(data=>{
        res.send(data);
    })
}

const deleteExpense=(req,res,next)=>{
    const id=req.params.userId;
    console.log(id);
    expense.destroy({
        where:{
            id:id
        }
    })
    .then(response=>{
        res.send("deleted");
    })
}

module.exports={
    addExpense,
    getExpenses,
    deleteExpense
}