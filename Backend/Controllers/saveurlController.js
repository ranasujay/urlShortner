const mongoose = require('mongoose');
const UrlModel = require('../Models/UrlModel');
const User = require('../Models/User');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateId = (length = 6) => {
    let id = "";
    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}

// Generate unique ID with collision check and auto-scaling
const generateUniqueId = async (retries = 5, initialLength = 6) => {
    let length = initialLength;
    
    for (let attempt = 0; attempt < retries; attempt++) {
        const id = generateId(length);
        
        const existingUrl = await UrlModel.findOne({ unqId: id });
        
        if (!existingUrl) {
            return id; 
        }
        // After 3 collisions, increase length for better distribution
        if (attempt === 2) {
            length++;
        }
    }
    
    // If still colliding after retries, use timestamp-based approach as fallback length of 8
    const timestamp = Date.now().toString(36);
    const random = generateId(4);
    const fallbackId = `${random}${timestamp}`.substring(0, 8);
    
    console.log(`Using fallback ID generation: ${fallbackId}`);
    return fallbackId;
}


exports. saveUrl = async(req,resp) => {
const {userEmail,url,name}  =req.body;
if(!url){
    console.log('url field is empty!!!!');
    return resp.status(502).json({
        success:false,
        message:'url not send to server'
    })
}
try{
    //find the user first to get userId
    const user = await User.findOne({email:userEmail});
    if(!user){
        return resp.status(404).json({
            success:false,
            message:'User not found'
        })
    }

    //check if the SAME USER already shortened this URL
    const Foundurl = await UrlModel.findOne({
        originalLink: url,
        userId: user._id
    });
    
    if(Foundurl){
        console.log('URL already shortened by this user, returning existing shortened URL');
        return resp.status(200).json({
            success:true,
            data:Foundurl,
            message:'URL already shortened by you'
        });
    }

    // Different user or new URL - create new shortened URL
    // Generate unique ID with collision detection
    const uniqueId = await generateUniqueId();

    const urlObject = new UrlModel({
        userId:user._id,
        name:name,
        originalLink:url,
        unqId:uniqueId,
        shortUrl:`${process.env.BASE_URL}${uniqueId}`
    })

    const newUrl = await urlObject.save();
    console.log('New URL saved with userId:', newUrl);

    return resp.status(200).json({
        success:true,
        data:newUrl
    })

}catch(err){
    console.log('error occured while saving url to database!!!',err.message);
    console.error(err);
    resp.status(501).json({
        success:false,
        message:err.message
    })
}
}

//function for deleting the url
exports.deleteUrl = async (req,resp) => {
    const {id} = req.params;
    try{
        const deletedUrl = await UrlModel.findOneAndDelete({unqId:id});
        if(deletedUrl){
            console.log('url deleted successfully!!!');
            return resp.status(200).json({
                success:true,
                message:'url deleted successfully'
            })
        }
        else{
            console.log('url not found!!!');
            return resp.status(404).json({
                success:false,
                message:'url not found'
            })
        }
    }catch(err){
        console.log('error occured while deleting the url!!!',err.message);
        console.error(err);
        return resp.status(501).json({
            success:false,
            message:err.message
        })
    }
}