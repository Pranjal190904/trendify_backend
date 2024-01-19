const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String
    },
    password:{
        type:String,
        require:true
    },
    isVerified:{
        type:Boolean,
        require:true,
        default:false
    }
})

module.exports=mongoose.model('User',userSchema);