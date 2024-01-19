const mongoose=require('mongoose');
const {dbUrl}=require('../config/env.config');

const dbConnect=()=>{
    try
    {
        mongoose.connect(`${dbUrl}`);
        console.log(`database connected successfully.`);
    }
    catch(err)
    {
        console.log(`error: ${err}`);
    }
}
module.exports={dbConnect}