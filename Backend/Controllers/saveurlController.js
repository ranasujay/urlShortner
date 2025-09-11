const mongoose = require('mongoose');
const UrlModel = require('../Models/UrlModel');
const User = require('../Models/User');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateId = () => {
    let id ="";
    for (let i = 1;i<=6; i++){
        id=id+characters.charAt(Math.floor(Math.random()*characters.length))
    }

  return id;
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

    //check if the url is present in the database or not 
    const Foundurl = await UrlModel.findOne({originalLink:url});
    if(Foundurl){
        console.log('url already exist on database');
        resp.redirect(Foundurl.originalLink);
    }

    else{
        //first create an unique id for the url
        const uniqueId = generateId();

        const urlObject = new UrlModel({
            name:name,
            originalLink:url,
            unqId:uniqueId,
            shortUrl:`${process.env.BASE_URL}${uniqueId}`
        })

        const newUrl = await urlObject.save();

        //now we will store the url id to the user who crated it
        const user = await User.findOne({email:userEmail});

        user.links.push(newUrl._id);
        
        const updatedUser = await user.save();
        console.log(updatedUser);

        return resp.status(200).json({
            success:true,
            data:newUrl
        })
    }

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