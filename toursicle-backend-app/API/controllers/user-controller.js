import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import * as userservices from '../services/user-services.js';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "toursicle@gmail.com",
        pass: "izpfgvkxurbtnmjd",
    },
});

const secret = "test";

// Method to verifying and signing in the user
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try{
        const oldUser = await UserModel.findOne({email});
        if(!oldUser){
            return res.status(404).json({message: "User does not exist"});
        }
        const isPasswordRight = await bcrypt.compare(password, oldUser.password);

        if(!isPasswordRight){
            return res.status(400).json({message: "Invalid credentials"});
        }

        if(!oldUser.verified){
            return res.status(400).json({message: "Please Verify your Account!"});
        }


        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: "1h"});

        res.status(200).json({result: oldUser, token})
    }
    catch(error){
        res.status(500).json({message: "Something went wrong."});
        console.log(error); 
    }
}

// Method for signing up a new user
export const signup = async (req, res) => {
    const {email, password, firstName, lastName} = req.body; 
    try{
        //authenticate here if the user exists 
        const oldUser = await UserModel.findOne({email});

        if(oldUser) {
            return res.status(400).json({message: "User already exists."});
        }

        //crypting the password with length=12
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userservices.create({
            // _id : new mongoose.Types.ObjectId,
            email : email,
            password : hashedPassword,
            name : `${firstName} ${lastName}`
        });

        // generate token
        const token = jwt.sign({
            email : result.email, 
            id : result._id
        },
        secret,
        {expiresIn : "1h"} //expiry time of token
        );

        const verifyToken = result.generateVerificationToken();
        // Email the user a unique verification link
        const url = `http://localhost:8000/users/verify/${verifyToken}`
        transporter.sendMail({
            to: email,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
        })

        //send response
        // return res.status(201).send({
        //     message: `Sent a verification email to ${email}`
        //   });

        // //send response
        res.status(201).json({result, token});
    }catch(error) {
        res.status(500).json({message: error.message});
        // console.log(error); 
    }
}

// Method for verifying email
export const verify = async (req, res) => {
    // console.log("params:- "+req.params.id)
    const token = req.params.id
    // Check we have an id
    // console.log("token: "+token);
    if (!token) {
        return res.status(422).send({ 
             message: "Missing Token" 
        });
    }
    //  Verify the token from the URL
    let payload = null
    try {
        const USER_VERIFICATION_TOKEN_SECRET = "dgfgpspdifgskdfngussj490385jsp8ms";
        payload = jwt.verify(
            token,
           USER_VERIFICATION_TOKEN_SECRET
        );
    } catch (err) {
        return res.status(500).send(err);
    }
    try{
        // Find user with matching ID
        const user = await UserModel.findOne({ _id: payload.ID }).exec();
        if (!user) {
           return res.status(404).send({ 
              message: "User does not  exists" 
           });
        }
        // Update user verification status to true
        user.verified = true;
        await user.save();
        return res.status(200).send({
              message: "Account Verified"
        });
     } catch (err) {
        return res.status(500).send(err);
     }
}