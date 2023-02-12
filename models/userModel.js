
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const userSchema = new Schema({

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

userSchema.statics.signup = async function(email , password){

    if(!email || ! password){
        throw Error('All fields must be filled')
    }
    //chack if the user exists 
    const exists = await this.findOne({email})
    if(exists){
        throw Error('user already exists ')
    }
    //generate salt
    const salt = await bcrypt.genSalt(10)

    //hash the password 
    const hash = await bcrypt.hash(password , salt)

    const user = await this.create({email , password:hash})
    return user ;
}

userSchema.statics.login = async function(email , password){

    if(!email || ! password){
        throw Error('please enter all fields')
    }
    const user = await this.findOne({email})
   
    //compare passwords
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error("Incorrect password")
    }
    return user 
}
module.exports = mongoose.model('User' , userSchema)