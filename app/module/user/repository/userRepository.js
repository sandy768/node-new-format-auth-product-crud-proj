const UserModel=require('../model/userModel');

class UserRepository{
    async save(data){
        try{
            let addUser=await UserModel.create(data);
            return addUser;
        }
        catch(err){
            console.log("Error to save user data",err);
            
        }
    }
    async findUser(query){
        try{
            const userData=await UserModel.findOne(query);
            return userData;
        }
        catch(err){
            console.log("Error to find user data",err);
            
        }
    }
}
module.exports=new UserRepository();