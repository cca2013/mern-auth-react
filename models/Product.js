const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    name: String,
    description: String,
    user: String,
	image:String
})

mongoose.model('products', productSchema);