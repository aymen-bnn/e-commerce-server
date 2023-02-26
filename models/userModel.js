
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const userSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String ,
        required : true 
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

userSchema.statics.signup = async function(firstname , lastname ,email , password){
    try {
        if(!firstname || !lastname || !email || ! password){
            throw new Error('All fields must be filled')
        }
        //chack if the user exists 
        const exists = await this.findOne({email})
        if(exists){
            throw new Error('user already exists ')
        }
        //generate vssalt
        const salt = await bcrypt.genSalt(10)
    
        //hash the password 
        const hash = await bcrypt.hash(password , salt)
    
        const user = await this.create({firstname , lastname ,email , password:hash})
        return user ;
        
    } catch (error) {
        console.log(error.message)
    }
}

userSchema.statics.login = async function(email , password){

    if(!email || ! password){
        throw new Error('please enter all fields')
    }
    const user = await this.findOne({email})
   
    //compare passwords
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw new Error("Incorrect password")
    }
    return user 
}
module.exports = mongoose.model('User' , userSchema)