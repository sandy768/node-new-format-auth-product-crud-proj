const mongoose=require('mongoose');
const TokenSchema=new mongoose.Schema({
    _userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user_details"
    },
    token:{
        type:String,
        required:true
    }
},
{
    timestamps:true,
    versionKey:false,
});
const TokenModel=new mongoose.model('token_details',TokenSchema);
module.exports=TokenModel;