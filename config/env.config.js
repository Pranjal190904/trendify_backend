require('dotenv').config();

module.exports={
    port:process.env.PORT,
    accessTokenSecret:process.env.ACCESS_TOKEN_SECRET,
    mail:process.env.MAIL,
    mailPass:process.env.MAILPASS
}