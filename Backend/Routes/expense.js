const express=require('express');

const router=express.Router();
const expenseController=require('../Controller/expense');
const userauthentication=require('../middleware/auth');

router.post('/add-expense',userauthentication.authenticate,expenseController.addExpense);

router.get('/getexpenses',userauthentication.authenticate,expenseController.getExpenses);

router.delete('/delete-expense/:userId',expenseController.deleteExpense)

module.exports=router;