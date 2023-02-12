
const User= require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    console.log({_id : _id})
    return jwt.sign({_id : _id} , process.env.SECRETTOKEN , {expiresIn : '7d'})
}
const loginUser = async (req , res) => {

    const {email , password} = req.body
    try {
        const user = User.login(email , password)

        //create atoken
        token = createToken(user._id)

        //send the token to the brwser
        console.log({email , token})
        res.status(200).send({email , token})

    } catch (error) {
        console.log(error)
    }
}

const signupUser = async (req , res) => {

    const {email , password} = req.body

    try {
        const user = User.signup(email , password)
        console.log("user signed in")
    } catch (error) {
        console.log(error)
    }
}
module.exports = {loginUser , signupUser}