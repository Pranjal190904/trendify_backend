const express=require('express')
const {getProducts}=require('../controllers/trendify.controller');
const router=express();

router.get('/products',getProducts);

module.exports=router;