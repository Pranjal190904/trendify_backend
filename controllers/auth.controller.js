const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const {signAccessToken}=require('../utils/token');

async function userRegister(req,res){
    try{
        const {name,email,password}=req.body;
        const checkUser=await userModel.findOne({email:email});
        const hashedPswrd=await bcrypt.hash(password,10);
        if(checkUser)
        {
            await userModel.findOneAndUpdate({email},{name,password:hashedPswrd});
        }
        else
        {
            const newUser=new userModel({
                name:name,
                email:email,
                password:hashedPswrd
            });
            await newUser.save();
        }
        const user=await userModel.findOne({email:email});
        const token=signAccessToken(user.id);
        res.cookie('accessToken',token,{httpOnly:true,secure:true,sameSite:'None'});
        res.status(200).json({message:"register successful."});
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
        const matchPassword=await bcrypt.compare(password,user.password);
        if(!matchPassword)
        {
            res.status(401).json({message:"incorrect password."});
            return ;
        }
        const token=signAccessToken(user.id);
        res.cookie('accessToken',token,{httpOnly:true,secure:true,sameSite:'None'});
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
        const userId=req.user.aud;
        const userProfile=await userModel.findOne({_id:userId});
        res.status(200).json({name:userProfile.name,email:userProfile.email});
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."})
    }
}

module.exports={userRegister,loginUser,showProfile};