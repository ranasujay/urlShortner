const mongoose = require('mongoose');
const User = require('../Models/User');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs')

//defining the controller
exports.signupController = async (req, resp) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    console.log(req.files);
    if (!req.files && !req.files.image) {
        return resp.status(404).json({
            success:false,
            message:"file is not uploaded"
        })
    }
    const file = req.files.image;

    //saving the data to the data base

    try {

        //before saving upload the phot to cloudinary
        const coudinaryRes = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'Trimmr'
        })
        if (!coudinaryRes) {
            console.log('file uploading to cloudinary failed');
            return resp.status(502).json({
                success: false,
                message: 'file could not get uploaded in cloudinary'
            })
        }

        //find first if the user is already present in the database
        const user = await User.findOne({ email: email });
        if (user) {
            return resp.status(500).json({
                success: false,
                message: 'user is already present in the database'
            })
        }

        //hash its passowrd and save it to database
        const hashed = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName: name,
            email: email,
            password: hashed,
            image: coudinaryRes.secure_url
        })

        const savedUser = await newUser.save();

        //removinng password before sending
        savedUser.password = "";

        resp.status(200).json({
            success: true,
            message: 'user created succesfully',
            data: savedUser
        })

    } catch (err) {

        console.log('internal server error');
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error'
        })

    }
}