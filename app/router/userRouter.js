const express=require('express');
const userRouter=express.Router();
const uploadUserImages=require('../helper/userImage');
const userController=require('../module/webservice/userController');

userRouter.get('/',userController.getRegister);
userRouter.post('/user/postregdata',uploadUserImages.array('user_image',2),userController.postRegister);
userRouter.get('/user/mail_confirmation/:email/:token',userController.mailVerification);
userRouter.get('/user/getlogdata',userController.getLogin);
userRouter.post('/user/postlogdata',userController.postLogin);

module.exports=userRouter;