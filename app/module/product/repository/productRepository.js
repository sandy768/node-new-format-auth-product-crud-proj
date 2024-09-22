const ProductModel=require('../model/productModel');
class ProductRepository{
    async save(data){
        try{
            const addProduct=await ProductModel.create(data);
            return addProduct;
        }
        catch(err){
            console.log("Error to pass add product",err);
        }
    }

    async findAllProducts(){
        try{
            const viewProduct=await ProductModel.find();
            return viewProduct;
        }
        catch(err){
            console.log("Error to pass view product details",err); 
        }
    }

    async findProductById(product_id){
        try{
            const existing_data=await ProductModel.findById(product_id);
            return existing_data;
        }
        catch(err){
            console.log("Error to return existing product data",err);
        }
    }

    async deleteProduct(product_id){
        try{
            const deletedProduct=await ProductModel.findByIdAndDelete(product_id);
            return deletedProduct;
        }
        catch(err){
            console.log("Error to pass deleted product id",err);
        }
    }
}
module.exports=new ProductRepository();