const productModel=require('../models/product.model');

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

module.exports={getProducts};