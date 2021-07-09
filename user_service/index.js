/*
*express
* mongoose
* nodemon
* cors
* dotenv
*** npm i express mongoose cors dotenv
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = process.env.USER_PORT;



const userRoute = require('./routes/UserRoute');
const incomeRoute = require('./routes/IncomeRoute');
const expenseRoute = require('./routes/ExpenseRoute');


const app = express();
app.use(express.json({limit: '50mb'}))
app.use(cors());

mongoose.connect(
    'mongodb://127.0.0.1:27017/mywallet',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(()=>{

    app.listen(port, ()=>{
        console.log(`My Wallet user service running on ${port}`)
        console.log('My wallet API is running...')
    });

}).catch((error=>{
    console.log(error);
}))


app.use('/api/v1/userRoute', userRoute);
app.use('/api/v1/incomeRoute', incomeRoute);
app.use('/api/v1/expenseRoute', expenseRoute);