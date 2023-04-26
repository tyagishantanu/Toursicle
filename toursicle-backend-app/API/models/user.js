import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: false
    },
    googleId : {
        type: String,
        required: false
    },
    id : {
        type: String
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamp: true, versionKey: false } );

const USER_VERIFICATION_TOKEN_SECRET = "dgfgpspdifgskdfngussj490385jsp8ms";
userSchema.methods.generateVerificationToken = function () {
    const user = this;
    console.log("1");
    const verificationToken = jwt.sign(
        { ID: user._id },
       USER_VERIFICATION_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
    console.log("2");
    return verificationToken;
};


export default mongoose.model("User", userSchema);