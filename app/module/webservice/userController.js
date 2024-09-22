const UserModel=require('../user/model/userModel');
const UserRepository=require('../user/repository/userRepository');

const TokenRepository=require('../user/repository/tokenRepository');
const jwt=require('jsonwebtoken');

const {hashPassword, comparePassword} = require('../../middleware/isPassHash');
const {createTransporter,mailSend} = require('../../middleware/isMailTransport');

class UserController{
    getRegister(req,res){
        let successReg=req.flash('reg-success');
        let regSuccess=successReg.length>0?successReg[0]:null;

        let errReg=req.flash('reg-err');
        let regErr=errReg.length>0?errReg[0]:null;

        let errVerify=req.flash('err-verify');
        let verifyErr=errVerify.length>0?errVerify[0]:null;

        let errToken=req.flash('err-token');
        let tokenErr=errToken.length>0?errToken[0]:null;

        res.render('user/registration',{
            title:"Sign Up",
            successRegis:regSuccess,
            errorReg:regErr,
            errorVerify:verifyErr,
            errorToken:tokenErr,
        });
    }
    async postRegister(req,res){
        try{
            // console.log("Collected data:",req.body,req.files);
             let hashedPassword=await hashPassword(req.body.password);
            //  console.log('After hashing the password',hashedPassword);
             let user_images=req.files.map(images=>images.filename);
             let user_data={
                username:req.body.username.toLowerCase(),
                gender:req.body.gender,
                email:req.body.email,
                password:hashedPassword,
                user_image:user_images
             }
             let saved_user=await UserRepository.save(user_data);
            //  console.log("User details saved successfully:",saved_user);
            const token_jwt=jwt.sign(
                {email:req.body.email},
                process.env.SECRET_KEY,
                {expiresIn:"1h"},
                );
             const tokenData={
                _userId:saved_user._id,
                token:token_jwt,
             };
             
             let token_save=await TokenRepository.saveToken(tokenData);
                //  console.log("Saved token details:",token_save);
                 if(token_save){
                    const senderEmail=process.env.SENDER_EMAIL;
                    const senderPassword=process.env.SENDER_PASSWORD;
                    const transport=createTransporter(senderEmail,senderPassword);
                
                    const mailReceiver={
                        from: senderEmail,
                        to: req.body.email,
                        subject: "Email Verification",
                        text: 'Hello'+" "+req.body.username.toUpperCase()+'\n\n'+
                        '\n\nYou have successfully submitted your data to be registered. Please verify your account by clicking this link:\n'+
                        'http://'+
                        req.headers.host+
                        '/user/mail_confirmation/'+
                        req.body.email+
                        '/'+
                        token_jwt+
                        '\n\nThank you!\n'
                    }
                    mailSend(req,res,transport,mailReceiver);
                }
                else{
                    console.log("Token is expired");
                }
            }
            catch(err){
                console.log("Error to collect user registration details",err);            
            }
        }

        async mailVerification(req,res){
            try{
                let token_match=await TokenRepository.tokenMatch({token:req.params.token});
                if(token_match){
                    let exist_user=await UserRepository.findUser({email:req.params.email});
                    if(exist_user.isVerify){
                        req.flash('err-verify','Already verified, Go to login');
                        res.redirect('/');
                    }
                    else{
                        exist_user.isVerify=true;
                        let save_user=await exist_user.save();
                        if(save_user){
                            req.flash('success-verify','Successfully verified, Sign In now');
                            res.redirect('/user/getlogdata');
                        }
                    }
                }
                else{
                    req.flash('err-token','Link is expired, Please sign up again');
                    res.redirect('/');
                }
            }
            catch(err){
                console.log("Error to send verification mail",err);                
            }
        }

        getLogin(req,res){
            let successVerify=req.flash('success-verify');
            let verifySuccess=successVerify.length>0?successVerify[0]:null;

            let errMail=req.flash('err-mail');
            let mailErr=errMail.length>0?errMail[0]:null;

            let errPass=req.flash('err-pass');
            let passErr=errPass.length>0?errPass[0]:null;

            res.render('user/login',{
                title:'Sign In',
                success_verify:verifySuccess,
                errorMail:mailErr,
                errorPass:passErr,
            });
        }

        async postLogin(req,res){
            try{
                let existing_user=await UserRepository.findUser({email:req.body.email});
                if(existing_user){
                    let compPassword=await comparePassword(req.body.password,existing_user.password);
                    if(compPassword){
                        let token_payload={userDetails:existing_user};
                        const token_jwt=jwt.sign(token_payload,process.env.SECRET_KEY,{
                            expiresIn:"1h",
                        });
                        res.cookie("token_data",token_jwt,{
                            expires:new Date(Date.now()+3600000),
                            httpOnly:true,
                        });
                        res.redirect('/getproductdata');
                    }
                    else{
                        req.flash('err-pass','Incorrect password');
                        res.redirect('/user/getlogdata');
                    }
                }
                else{
                    req.flash('err-mail','Invalid user');
                    res.redirect('/user/getlogdata');
                }
            }
            catch(err){
                console.log("Error to collect login data",err);
            }
        }
}

const userController=new UserController();
module.exports=userController;