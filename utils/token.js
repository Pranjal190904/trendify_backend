const {ACCESS_TOKEN_SECRET}=require('../config/env.config');
const jwt=require('jsonwebtoken');

function signAccessToken(id)
{
    try
    {
        const payload={
            aud:id
        };
        const options={
            expiresIn:'10d'
        };
        const token=jwt.sign(payload,ACCESS_TOKEN_SECRET,options);
        return token;
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."});
    }
}

module.exports={signAccessToken};