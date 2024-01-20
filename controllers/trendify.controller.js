const productModel=require('../models/product.model');
const userModel=require('../models/user.model');
const notificationModel=require('../models/notification.model');

async function getProducts(req, res){
    try{
        const productId=req.query.productId;
        const category=req.query.category;
        if(productId)
        {
            const product=await productModel.find({_id:productId});
            res.status(200).json(product);
        }
        else if(category)
        {
            const product=await productModel.find({category});
            res.status(200).json(product);
        }
        else{
            const product=await productModel.find();
            res.status(200).json(product);
        }
    } 
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

async function addToWishlist(req,res)
{
    try{
        const userId=req.user.aud;
        const {productId}=req.body;
        const user=await userModel.findOne({_id:userId});
        const product=await productModel.findOne({_id:productId});
        const wishingUsers=product.wishingUsers;
        wishingUsers.push(userId);
        const wishList=user.wishList;
        wishList.push(productId);
        await userModel.findOneAndUpdate({_id:userId},{wishList:wishList});
        await productModel.findOneAndUpdate({_id:productId},{wishingUsers:wishingUsers});
        res.status(200).json({message:"product added to wishlist."})
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."});
    }
}

async function addToCart(req,res)
{
    try{
        const userId=req.user.aud;
        const productId=req.body;
        const user=await userModel.findOne({_id:userId});
        const cart=user.cart;
        cart.push(productId);
        await userModel.findOneAndUpdate({_id:userId},{cart:cart});
        res.status(200).json({message:"product added to cart."});
    }
    catch(err)
    {
        res.status(500).jaon({message:"internal server error."})
    }
}

async function getWishList(req,res)
{
    try{
        const userId=req.user.aud;
        const userLogged=await userModel.findOne({_id:userId});
        const wishList=userLogged.wishList;
        const userWishlist=[];
        for(let i=0;i<wishList.length;i++)
        {
            const productId=wishList[i];
            const product=await productModel.findOne({_id:productId});
            userWishlist.push(product);
        }
        res.status(200).json(userWishlist);
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."});
    }
}

async function getCart(req,res)
{
    try{
        const userId=req.user.aud;
        const userLogged=await userModel.findOne({_id:userId});
        const cart=userLogged.cart;
        const userCart=[];
        for(let i=0;i<cart.length;i++)
        {
            const {productId}=cart[i];
            const product=await productModel.findOne({_id:productId});
            userCart.push(product);
        }
        res.status(200).json(userCart);
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."});
    }
}

async function removeFromWishlist(req,res)
{
    try{
        const userId=req.user.aud;
        const {productId}=req.body;
        const user=await userModel.findOne({_id:userId});
        const wishList=user.wishList;
        for(let i=0;i<wishList.length;i++)
        {
            if(wishList[i]==productId)
            {
                wishList.splice(i,1);
                break;
            }
        }
        const product=await productModel.findOne({_id:productId});
        const wishingUsers=product.wishingUsers;
        for(let i=0;i<wishingUsers.length;i++)
        {
            if(wishingUsers[i]==userId)
            {
                wishingUsers.splice(i,1);
                break;
            }
        }
        await userModel.findOneAndUpdate({_id:userId},{wishList:wishList});
        await productModel.findOneAndUpdate({_id:productId},{wishingUsers:wishingUsers});
        res.status(200).json({message:"product removed from wishlist."})
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."});
    }
}

async function removeFromCart(req,res)
{
    try{
        const userId=req.user.aud;
        const {productId}=req.body;
        const user=await userModel.findOne({_id:userId});
        const cart=user.cart;
        for(let i=0;i<cart.length;i++)
        {
            if(cart[i].productId==productId)
            {
                cart.splice(i,1);
                break;
            }
        }
        await userModel.findOneAndUpdate({_id:userId},{cart:cart});
        res.status(200).json({message:"product removed from cart."})
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."});
    }
}

async function changePrice(req,res)
{
    const {productId,newPrice}=req.body;
    const product=await productModel.findOne({_id:productId});
    const wishingUsers=product.wishingUsers;
    if(product.price<=newPrice)
    {
        await productModel.findOneAndUpdate({_id:productId},{price:newPrice});
        res.status(200).json({message:"price updated successfully."})
        return ;
    }
    const subject="Product price decreased.";
    const detail=`Price of ${product.productName} changed to ${newPrice}`;
    for(let i=0;i<wishingUsers.length;i++)
    {
        sendNotification(wishingUsers[i],subject,detail);
    }
    await productModel.findOneAndUpdate({_id:productId},{price:newPrice});
    res.status(200).json({message:"price updated successfully."})
}


async function sendNotification(userId,subject,detail)
{
    const user=await userModel.findOne({_id:userId});
    const notifications=user.notification;
    const newNotification=new notificationModel({
        subject:subject,
        detail:detail
    });
    const savedNotification=await newNotification.save();
    await notifications.push(savedNotification.id);
    await userModel.findOneAndUpdate({_id:userId},{notification:notifications});
}

async function getNotifications(req,res)
{
    try{
        const userId=req.user.aud;
        const userLogged=await userModel.findOne({_id:userId});
        const notifications=userLogged.notification;
        const notificationData=[];
        for(let i=0;i<notifications.length;i++)
        {
            const notification=await notificationModel.findOne({_id:notifications[i]});
            notificationData.push(notification);
        }
        res.status(200).json(notificationData);
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error."})
    }
}
module.exports={getProducts,addToWishlist,addToCart,getWishList,getCart,removeFromCart,removeFromWishlist,changePrice,getNotifications};