const jwt=require('jsonwebtoken');

class AuthJwt{
    authJwt(req,res,next){
        try{
            if(req.cookies && req.cookies.token_data){
                jwt.verify(req.cookies.token_data,process.env.SECRET_KEY,(err,data)=>{
                    // console.log(data);
                    req.user=data;
                    next();
                })
            }
            else{
                next();
            }
        }
        catch(err){
            console.log("Error to verify token data",err);
        }
    }
}
module.exports=new AuthJwt();