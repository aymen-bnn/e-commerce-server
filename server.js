
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

//routes
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

mongoose.set('strictQuery' , true)
require('dotenv').config()

//lunching the app
const app = express();
app.use(cors())

//midleware
app.use(express.json());

//track path and method
app.use((req , res , next) => {
    console.log(req.path , req.method)
    next();
})

//routes
app.use('/api/user' , userRoutes)
app.use('/api/product' , productRoutes)
app.use('/api/order' , orderRoutes)

mongoose.connect(process.env.MONGOURL)
.then(() => {
    app.listen(process.env.PORT,() => {
        console.log(`listenening on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(err)
})