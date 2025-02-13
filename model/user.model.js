const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    } ,
    imageUrl : {
        type : String ,
        required : true
    } ,
    summary : {
        type : String ,
        required : true 
    }
},{timestamps : true})

module.exports = mongoose.model('User' , userSchema)