const mongoose = require('mongoose');
require('dotenv').config();

exports. connectToDatabase = () => {
    mongoose.connect(`${process.env.DB_STRING}`).then(() => {
       console.log('database connectrion estabilished');
       
    }).catch((err)=> {
        console.error(err);
        console.log(err.message);
    })
}