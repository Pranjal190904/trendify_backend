const express=require('express');
const {userRegister,verifyUser,loginUser,showProfile}=require('../controllers/auth.controller');
const {verifyAccessToken}=require('../middlewares/auth');
const router=express();

router.post('/register',userRegister);
router.post('/verifyUser',verifyUser);
router.post('/login',loginUser);
router.get('/profile',verifyAccessToken,showProfile);

module.exports=router