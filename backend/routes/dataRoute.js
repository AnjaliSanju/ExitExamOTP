const express=require('express');
const { postEmail, verifyOtp } = require('../controllers/otpController');
const router=express.Router();

router.use(express.json());


//Registering email with otp in database

router.post('/postemail',postEmail)

//Verifying the otp with database

router.get('/verifyOtp',verifyOtp)

module.exports=router;