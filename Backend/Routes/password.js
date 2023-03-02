const express=require('express');

const router=express.Router();

const passwordController=require('../Controller/password');

router.get('/updatepassword/:resetpasswordid', passwordController.updatepassword)

router.get('/resetpassword/:id', passwordController.passwordreset)

router.use('/forgotpassword',passwordController.forgotpassword)

module.exports=router