const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports. loginController = async (req,resp) => {
   const {email,password} = req.body;
   try{
    //find the user in db
    const user =await User.findOne({email:email});
    if(!user){
        return resp.status(200).json({
            success:false,
            message:'not found',
            needSignup:true
        })
    }

    //matching password
    const result = await bcrypt.compare(password,user.password);
    if(!result){
        return resp.status(200).json({
            success:false,
            message:'not found',
            password:true
        })
    }

   //creating jwt token - only include safe fields
   const userForToken = {
       _id: user._id,
       userName: user.userName,
       email: user.email,
       image: user.image
   };
   const token = jwt.sign(userForToken, process.env.JWT_SECRET, {expiresIn:'1d'})

   resp.cookie('token', token, {
    httpOnly: true,   // Prevents client-side JavaScript from accessing the cookie
    secure: true,     // Ensures the cookie is only sent over HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds (1 day)
  });

   resp.status(200).json({
    success:true,
    data:userForToken,
    token:token,
    message:'user logedin succesfully'
   })
    

   }catch(err){
    console.error(err.message);
    console.log('internal server error');
    resp.status(500).json({
         success:false,
         message:'internal server error'
    })
   }
}