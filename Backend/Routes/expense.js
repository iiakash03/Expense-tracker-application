const express=require('express');

const router=express.Router();
const expenseController=require('../Controller/expense');
const userauthentication=require('../middleware/auth');

router.post('/add-expense',userauthentication.authenticate,expenseController.addExpense);

router.get('/getexpenses',userauthentication.authenticate,expenseController.getExpenses);

router.delete('/delete-expense/:userId',userauthentication.authenticate,expenseController.deleteExpense)

router.get('/update-Expense/:userId',userauthentication.authenticate,expenseController.updateExpense)

module.exports=router;