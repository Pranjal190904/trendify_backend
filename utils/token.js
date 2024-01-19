const {accessTokenSecret}=require('../config/env.config');
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
        const token=jwt.sign(payload,accessTokenSecret,options);
        return token;
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports={signAccessToken};