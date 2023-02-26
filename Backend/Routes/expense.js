const express=require('express');
const router=express.Router();
const expenseController=require('../Controller/expense');

router.post('/add-expense',expenseController.addExpense);

router.get('/getexpenses',expenseController.getExpenses);

router.delete('/delete-expense/:userId',expenseController.deleteExpense)

module.exports=router;