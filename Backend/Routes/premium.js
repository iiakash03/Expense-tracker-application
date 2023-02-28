const express=require('express');

const router=express.Router();

const userauthentication=require('../middleware/auth');

const premiumController=require('../Controller/premium')

router.get('/purchasepremium',userauthentication.authenticate,premiumController.purchasepremium)

router.post('/updatetransactionstatus',userauthentication.authenticate,premiumController.updatetransactionstatus)

router.get('/showLeaderBoard',premiumController.showLeaderBoard);

module.exports=router;