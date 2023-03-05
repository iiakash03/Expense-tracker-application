const express=require('express');
const router=express.Router();
const userController=require('../Controller/user');
const authenticate=require('../middleware/auth');
const expenseController=require('../Controller/expense')

router.post('/register',userController.register)

router.post('/login',userController.login)

router.get('/download',authenticate.authenticate,expenseController.download)

module.exports=router;