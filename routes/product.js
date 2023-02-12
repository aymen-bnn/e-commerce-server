
const express = require('express')
const { AddProduct , 
    GetAllProduct,
    GetProduct,
    UpdateProduct} = require('../controllers/productContoller')


const router = express.Router()
//addproduct
router.post('/addproduct' , AddProduct)

//get all the products
router.get('/' , GetAllProduct)

//get a dingle product
router.get('/:id',GetProduct)

//delete a prodect 
router.patch('/update/:id', UpdateProduct)
module.exports = router