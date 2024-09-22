const express=require('express');
const productRouter=express.Router();
const ProductController=require('../module/webservice/productController');
const uploadProductImg=require('../helper/productImage');

productRouter.get('/getproductdata',ProductController.getForm);
productRouter.post('/postproductdata',uploadProductImg.single("productImage"),ProductController.addProduct);
productRouter.get('/viewproductdata',ProductController.viewProduct);
productRouter.post('/updateproductdata',ProductController.updateProduct);
productRouter.post('/newproductdata',uploadProductImg.single("productImage"),ProductController.newProduct);
productRouter.post('/deleteproductdata',ProductController.deleteProduct);

module.exports=productRouter;