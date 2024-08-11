const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();

require('./db/mongodb');
const dataRoute=require('./routes/dataRoute')

app.use(express.json());
app.use(cors());

app.use('/api',dataRoute);


const port=process.env.port||3000;
app.listen(port,()=>{
    console.log('OTP server listening to :'+port)
})
