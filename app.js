const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')

app.use('/user', express.static('uploads/'))


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());


const userRoutes = require('./routes/user.routes')

app.use('/api' , userRoutes)



mongoose.connect(process.env.MONGO_URL)
.then(
    console.log('Date base is running')
)
.catch((error)=>{
    console.log(error);
})



app.listen(process.env.Port , () =>{
    console.log(`server is listing ${process.env.Port}`);
})