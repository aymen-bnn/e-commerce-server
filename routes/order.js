
const express = require('express')
const {CreateOrder, GetAllOrders} = require('../controllers/orderController')

const router = express.Router()

//create an order
router.post('/create' , CreateOrder)
//get all orders
router.get('/' , GetAllOrders)
module.exports = router