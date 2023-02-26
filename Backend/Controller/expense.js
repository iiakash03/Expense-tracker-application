const { response } = require('express');
const expense=require('../Models/expense');

const addExpense=(req,res,next)=>{

    const price=req.body.price
    const description=req.body.description
    const category=req.body.category

    expense.create({
        price:price,
        category:category,
        description:description
    })
    .then((response)=>{
        res.send('OK');
    })
    .catch(err=>{
        res.send(err);
    })
}


const getExpenses=(req,res,next)=>{
    expense.findAll()
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