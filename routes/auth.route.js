const express=require('express');
const {userRegister,loginUser,showProfile}=require('../controllers/auth.controller');
const {verifyAccessToken}=require('../middlewares/auth');
const router=express();

router.post('/register',userRegister);
router.post('/login',loginUser);
router.get('/profile',verifyAccessToken,showProfile);

module.exports=router