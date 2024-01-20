const mongoose=require('mongoose');

const notificationSchema=mongoose.Schema({
    subject:{
        type:String
    },
    detail:{
        type:String
    }
})

module.exports=mongoose.model('notification',notificationSchema);