
const express = require('express')
const User = require('../models/userModel')
const Order = require('../models/orderModel')

//create an order

const CreateOrder = async (req, res) => {
    const { userId, products, address, wilaya, total } = req.body;
    console.log(userId)
    try {
      // Find the user
      const user = await User.findById(userId);
      // Validate inputs
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      if (!address || !wilaya || !total) {
        return res.status(400).json({ error: 'Missing required information' });
      }
      // Create the order
      const order = await Order.create({
        owner: user._id,
        email : user.email,
        products: products,
        address: address,
        wilaya: wilaya,
        total: total
      });
      // Return the created order
      return res.status(200).json(order);
    } catch (error) {
      // Return an error response
      return res.status(500).json({ error: error.message });
    }
  };

//get all orders
const GetAllOrders = async (req , res) => {
    try {
        
        const order = await Order.find().populate('owner')
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}
module.exports = {CreateOrder, GetAllOrders}