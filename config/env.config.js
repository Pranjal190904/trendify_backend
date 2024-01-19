require('dotenv').config();

module.exports={
    dbUrl:process.env.DBURL,
    port:process.env.PORT,
    accessTokenSecret:process.env.ACCESS_TOKEN_SECRET
}