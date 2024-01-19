const express=require('express')
const {getProducts,addToWishlist,addToCart,getWishList,getCart}=require('../controllers/trendify.controller');
const {verifyAccessToken}=require('../middlewares/auth');
const router=express();

router.get('/products',getProducts);
router.post('/addToWishlist',verifyAccessToken,addToWishlist);
router.post('/addToCart',verifyAccessToken,addToCart);
router.get('/getWishlist',verifyAccessToken,getWishList);
router.get('/getCart',verifyAccessToken,getCart);

module.exports=router;