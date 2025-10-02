const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports  = mongoose.model('User', userSchema);