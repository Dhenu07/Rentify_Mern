const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    category:String,
    name:String,
    price:String,
    available:[String],
    bathroom:String,
    ageOfProperty:String,
    amenities:[String],
    furnished:String,
    area:String,
    images:[String]
})
module.exports =mongoose.model('Houses',ItemSchema,'Houses');