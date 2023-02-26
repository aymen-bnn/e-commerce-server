
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = (req,res,next) => {

     // verify authentification
    
     const { authorization } = req.headers 

     if(!authorization){
        return res.status(401).json({error : "authorization token is required"})

     }
     const token = authorization.split(' ')[1]
     try {
        //we get the id
        const {_id} = jwt.verify(token , process.env.SECRETTOKEN)

        req.user = User.findOne({_id}).select('_id')
        next()

     } catch (error) {
        console.log(error)
        res.status(401).json({error : 'reqquest is not authorized '})
     }
}

module.exports = {requireAuth}