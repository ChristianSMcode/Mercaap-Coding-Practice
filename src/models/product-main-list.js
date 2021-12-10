const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:String,
    price: {
        type: Number || String,
        default: null

    },
    marca: {
        type:String,
        default: null
    },
    cuantity:{
        type: String || Number,
        default: null
    },
    category:{
        type:String,
        default:null
    },
    location:{
        type: String,
        default: null
    },
    dateCreation:{
        type:Date,
        default:Date.now
    },
    buyStatus:{
        type: Boolean,
        default:false
    },
    binData:{
        type:Object,
        default:null
    },
    user:{
        type:String,
    }


});

module.exports = mongoose.model('productMLPS', productSchema);