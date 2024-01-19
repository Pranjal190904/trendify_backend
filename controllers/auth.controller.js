const userModel=require('../models/user.model');
const otpModel=require('../models/otp.model');
const bcrypt=require('bcrypt');
const {signAccessToken}=require('../utils/token');
const sendMail=require('../utils/mailer')

async function userRegister(req,res){
    try{
        const {name,email,phone,password}=req.body;
        const checkUser=await userModel.findOne({email:email});
        if(checkUser && checkUser.isVerified)
        {
            res.status(400).json({message:"email already registered."});
            return ;
        }
        const hashedPswrd=await bcrypt.hash(password,10);
        if(checkUser)
        {
            await userModel.findOneAndUpdate({email},{name,phone,password:hashedPswrd});
        }
        else
        {
            const newUser=new userModel({
                name,
                email,
                phone,
                password:hashedPswrd
            });
            await newUser.save();
        }
        const otp=math.floor(math.random()*9000+1000);
        const checkOtp=await otpModel.findOne({email});
        if(checkOtp)
        {
            await otpModel.findOneAndUpdate({email},{otp});
        }
        else
        {
            const newOtp=new otpModel({
                email,
                otp
            })
            await newOtp.save();
        }
        sendMail(email,otp);
        res.status(201).json({message:"otp for verification sent successfully on email"});
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."});
    }
}

async function verifyUser(req,res)
{
    try{
        const {email,otp}=req.body;
        const checkUser=await userModel.findOne({email});
        if(!checkUser)
        {
            res.status(404).json({message:"user not found"});
            return;
        }
        if(checkUser.isVerified)
        {
            res.status(400).json({message:"user already verified."});
            return ;
        }
        const checkOtp=await otpModel.findOne({email});
        if(!checkOtp)
        {
            res.status(404).json({message:"otp expired"});
            return ;
        }
        if(checkOtp.otp!=otp)
        {
            res.status(401).json({message:"incorrect otp"});
            return ;
        }
        await userModel.findOneAndUpdate({email},{isVerified:true});
        await otpModel.findOneAndDelete({email});
        res.status(200).json({message:"user verified successfully."});
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."});
    }
}

async function loginUser(req,res)
{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user)
        {
            res.status(404).json({message:"user not found."});
            return ;
        }
        if(!user.isVerified)
        {
            res.status(400).json({message:"user not verified."})
        }
        const matchPassword=bcrypt.compare(password,user.password);
        if(!matchPassword)
        {
            res.status(401).json({message:"incorrect password."});
            return ;
        }
        const token=signAccessToken(user.id);
        res.cookie('accessToken',accessToken,{httpOnly:true,secure:true,sameSite:'None'});
        res.status(200).json({message:"login successful."});
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."});
    }
}

async function showProfile(req,res)
{
    try{
        const userId=req.user.id;
        const userProfile=await userModel.findOne({id:userId});
        res.status(200).json({name:userProfile.name,email:userProfile.email,phone:userProfile.phone});
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."})
    }
}

module.exports={userRegister,verifyUser,loginUser,showProfile};