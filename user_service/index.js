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
        console.log(`mywallet user service running on ${port}`)
        console.log('hello')
    });

}).catch((error=>{
    console.log(error);
}))


app.use('/api/v1/userRoute', userRoute);