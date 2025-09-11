const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema({
    name:{
        type:String
    },
    originalLink:{
        type:String,
        required:true,
        unique:true
    },
    unqId:{
        type:String
    },
    shortUrl:{
       type:String
    },
    clickCount:{
        type:Number,
        default:0
    },
    locations:{
        type:[String],
        default:[]
    },
    devices:{
        type:[String],
        default:[]
    },
    created: {
        type:Date,
        default:() => new Date()
    }
})

module.exports = mongoose.model('URL',URLSchema);