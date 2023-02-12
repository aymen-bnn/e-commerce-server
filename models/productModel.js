
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({

    name : {
        type : String,
        required : true 
    },
    description : {
        type : String ,
        required : true
    },
    items : [
        {
            productId: {
                type: Number,
                required: true
            },
            color : {type : String , required : true},
            price : {type : Number , required : true}

        }, 
        {
            productId: {type :Number},
            color : {type : String},
            price : {type : Number}

        }, 
        {
            productId: {type: Number},
            color : {type : String },
            price : {type : Number }

        }, 
    ]
})

//get all products
productSchema.statics.getAllProduct = async function(){
    const product = await this.find({})
    return product
}

//get a single product
productSchema.statics.getProduct = async function(id){
    
    //chack if it is not a valid id 
    const product = await this.findById(id)

    if(!product){
        throw Error('no such a product')
    }
    return product
}

//add product 
productSchema.statics.addProduct = async function(name , description , items){

    if(!name || !description || !items ){
        throw Error('all fields must be filled')
    }

    const product = await this.create({ name , description , items})

    return product
}

module.exports = mongoose.model('Product' , productSchema)