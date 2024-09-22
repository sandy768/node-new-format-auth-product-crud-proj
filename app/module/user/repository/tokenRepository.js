const TokenModel=require('../model/tokenModel');

class TokenRepository{
    async saveToken(tokenData){
        try{
            const savedToken=await TokenModel.create(tokenData);
            return savedToken;
        }
        catch(err){
            console.log("Error while saving token data",err);
        }
    }
    async tokenMatch(query){
        try{
            const token=await TokenModel.findOne(query);
            return token;
        }
        catch(err){
            console.log("Error to match token",err);
        }
    }
}
module.exports=new TokenRepository();