const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    }
},
{
    timestamps:true,
    versionKey:false,
});
const ProductModel=new mongoose.model('product_details',ProductSchema);
module.exports=ProductModel;