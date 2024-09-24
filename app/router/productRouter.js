const express=require('express');
const productRouter=express.Router();
const ProductController=require('../module/webservice/productController');
const userController=require('../module/webservice/userController');
const uploadProductImg=require('../helper/productImage');
const AuthJwt=require('../middleware/isAuth');

productRouter.get('/getproductdata',AuthJwt.authJwt,ProductController.getForm);
productRouter.post('/postproductdata',uploadProductImg.single("productImage"),ProductController.addProduct);
productRouter.get('/viewproductdata',AuthJwt.authJwt,ProductController.viewProduct);
productRouter.post('/updateproductdata',ProductController.updateProduct);
productRouter.post('/newproductdata',uploadProductImg.single("productImage"),ProductController.newProduct);
productRouter.post('/deleteproductdata',ProductController.deleteProduct);

module.exports=productRouter;