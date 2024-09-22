const ProductModel=require('../product/model/productModel');
const ProductRepository=require('../product/repository/productRepository');
const path=require('path');
const fs=require('fs');

class ProductController{
     getForm(req,res){
            res.render('product/addProduct',{
                title:"Add Product"
            })
    }
    
    async addProduct(req,res){
        try{
            // console.log("Collected data:",req.body,req.file);
            let data={
                productName:req.body.productName.toLowerCase(),
                productPrice:req.body.productPrice,
                productImage:req.file.filename,
            };
            let save_product=await ProductRepository.save(data);
            // console.log("Saved product details:",save_product);
            res.redirect('/viewproductdata');
        }
        catch(err){
            console.log("Error to collect data",err);            
        }
    }

    async viewProduct(req,res){
        try{
            let view_products=await ProductRepository.findAllProducts();
            // console.log("All products:",view_products);
            
            res.render('product/viewProduct',{
                title:"All Products",
                products:view_products,
            });
        }
        catch(err){
            console.log("Error to view products",err);
            
        }
    }

    async updateProduct(req,res){
        try{
            let product_id=req.body.pid;
            let existing_data=await ProductRepository.findProductById(product_id);
            // console.log("Existing product details:",existing_data);
            res.render('product/editProduct',{
                title:"Update Product",
                old_data:existing_data
            })
        }
        catch(err){
            console.log("Error to find existing product details",err);
        }
    }

    async newProduct(req,res){
        try{
            let product_id=req.body.pid;
            // console.log("Product id: ",product_id);
            let existing_data=await ProductRepository.findProductById(product_id);

            existing_data.productName=req.body.productName.toLowerCase()||existing_data.productName;
            existing_data.productPrice=req.body.productPrice||existing_data.productPrice;
            if(req.file==undefined){
                existing_data.productImage=existing_data.productImage;
            }
            else{
                let filePath=path.join("uploads","products",existing_data.productImage);
                fs.unlinkSync(filePath);
                existing_data.productImage=req.file.filename;
            }
            let newProduct=await ProductRepository.save(existing_data);
            // console.log("New Updated data:",newProduct);
            res.redirect('/viewproductdata');
        }
        catch(err){
            console.log("Error to update the product details",err);     
        }
    }

    async deleteProduct(req,res){
        try{
            let product_id=req.body.pid;
            let deletedProduct=await ProductRepository.deleteProduct(product_id);
            // console.log("Deleted product details:",deletedProduct);
            if(deletedProduct){
                let filePath=path.join("uploads","products",deletedProduct.productImage);
                fs.unlinkSync(filePath);
            }
            res.redirect('/viewproductdata');
        }
        catch(err){
            console.log("Error to delete the product",err);
        }
    }

}


module.exports=new ProductController();