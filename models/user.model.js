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
    password:{
        type:String,
        require:true
    },
    wishList:{
        type:Array,
    },
    cart:{
        type:Array
    },
    notification:{
        type:Array
    }
})

module.exports=mongoose.model('User',userSchema);