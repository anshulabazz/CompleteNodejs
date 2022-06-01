const mongoose = require('mongoose')
const catschema = mongoose.Schema({
    name: {
        type: String,
    }
})

catschema.virtual('item', {
    ref: 'item',
    localField: '_id',
    foreignField: 'category'


})
const category = mongoose.model("category", catschema)
module.exports=category