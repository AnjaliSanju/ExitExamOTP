const express=require('express');
const nodemailer=require('nodemailer');
const dataModel=require('../models/dataModel')

const postEmail=async(req,res)=>{
    
    const mailOtp=(email,randotp)=>{
        const emailTo=email;
        const otp=randotp;

        const transporter = nodemailer.createTransport({
            service:'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          });

          const mailOptions={
            from: {
                name:'Exit Exam OTP',
                subject: 'Exit Exam OTP',
                address:process.env.MAIL_USER
            }, // sender address
            to: emailTo, // list of receivers
            html:`<p>Your verificatiion code is:${otp}. Please dont share this code with anyone.</p>`, // Subject line
        
          }

          const sendMail =async(transporter,mailOptions)=>{
            try {
                await transporter.sendMail(mailOptions);
                console.log('Email has been sent!')
            } catch (error) {
                console.log(error);
            }
          }
        
          sendMail(transporter,mailOptions);
    }

    try{
        const randomOtp = Math.floor(1000 + Math.random() * 9000);

        const dataItem={
            email:req.body.email,
            otp:randomOtp
        }
        const Data=new dataModel(dataItem);
        // console.log(Data);

        await Data.save();
        mailOtp(dataItem.email,dataItem.otp);
        res.status(200).json({message:'Sending otp...Please login with the otp sent to your email!'});

    }catch(error){
        console.log(error);
        res.status(500).json({message:'Server error from Controller'});
    }
    
}

const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;

        if (!otp || typeof otp !== 'string') {
            return res.status(400).json({ message: 'Invalid OTP format' });
        }

        const dbOtp = await dataModel.findOne({ otp });

        if (dbOtp) {

            res.status(200).json({ message: 'OTP matched' });
        } else {
            res.status(400).json({ message: 'OTP mismatch' });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
//---------------------------------



//---------------------------------





module.exports={postEmail,verifyOtp}