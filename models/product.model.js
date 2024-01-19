const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    productName:{
        type:String
    },
    price:{
        type:String
    },
    productImage:{
        type:String,
    },
    category:{
        type:String
    },
    details:{
        type:String
    }
})

module.exports=mongoose.model('product',productSchema);