
const mongoose = require("mongoose")
const Product = require('../models/productModel')

//get all the products

const GetAllProduct = async(req , res ) => {

    try {
        const product = await Product.getAllProduct()
        console.log("getting all the products" , product)
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({error : "failed to get product"})
    }
}
//get a single product

const GetProduct = async (req , res) => {

    //get in the params
    const {id} = req.params 
    console.log(id)

    //check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : 'no such a product'});
    }

    //find the product
    const product = await Product.findById(id)

    //find if the product exists 
    if(!product){
        return res.status(400).json({error : 'product does not exist '})
    }
    res.status(200).json(product)
}

//Add new product 
const AddProduct = async (req , res) => {

    const {name , description , items} = req.body 

    try {
        //Create the product
        const product = Product.addProduct(name , description , items)
        //chack if it's created
        res.status(200).send({name , description , items})

    } catch (error) {
        res.status(400).send({error : "failed to addnew product"})
    }
}
//update a product
const UpdateProduct = async(req , res) => {

    const {id} = req.params
    //check if it is validate 
    if(!mongoose.Types.ObjectId.isValid){
        return res.status(400).json({error : 'no such a product'})
    }

    //Upadte the product
    const product = await Product.findOneAndUpdate({_id : id }, req.body)

    if(!product){
        res.status(400).json({error : "no product to update"})
    }
    res.status(200).json({product})
    
}

module.exports = {AddProduct , GetAllProduct ,GetProduct,UpdateProduct}