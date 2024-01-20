const express=require('express')
const {getProducts,addToWishlist,addToCart,getWishList,getCart,removeFromCart,removeFromWishlist,changePrice,getNotifications}=require('../controllers/trendify.controller');
const {verifyAccessToken}=require('../middlewares/auth');
const router=express();

router.get('/products',getProducts);
router.post('/addToWishlist',verifyAccessToken,addToWishlist);
router.post('/addToCart',verifyAccessToken,addToCart);
router.get('/getWishlist',verifyAccessToken,getWishList);
router.get('/getCart',verifyAccessToken,getCart);
router.post('/removeFromWishlist',verifyAccessToken,removeFromWishlist);
router.post('/removeFromCart',verifyAccessToken,removeFromCart);
router.post('/changePrice',changePrice);
router.get('/getNotification',verifyAccessToken,getNotifications);

module.exports=router;