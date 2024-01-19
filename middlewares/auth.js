const jwt=require('jsonwebtoken');
const {accessTokenSecret}=require('../config/env.config');

function verifyAccessToken(req,res,next)
{
    try
    {
        const token=req.cookies.accessToken;
        if(!token)
        {
            res.status(401).json({message:"token missing."});
            return ;
        }
        const decoded=jwt.verify(token,accessTokenSecret);
        req.user=decoded;
        next();
    }
    catch(err)
    {
        res.status(401).json({message:"unauthorized user"});
    }
}

module.exports={verifyAccessToken};