const mongoose=require('mongoose');

const dataSchema=new mongoose.Schema({
    email:String,
    otp:Number,
});

const dataModel=mongoose.model('data',dataSchema);

module.exports= dataModel