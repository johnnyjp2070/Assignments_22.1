let mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
    pName: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    availability: {
        type: Number
    },
    color: {
        type: String
    } 
})
module.exports = mongoose.model('product', productSchema)