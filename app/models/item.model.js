const mongoose = require('mongoose')
const validator = require('validator')
const mongoosepaginate = require('mongoose-paginate-v2')
const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: String,
        validate(value) {
            if (!validator.isNumeric(value)) {
                throw new Error("Numeric value is required")
            }

        }
    },
    category: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
        }
    ]
})
schema.method("toJSON", function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.__v
    return userObject
})
schema.plugin(mongoosepaginate)



const item = mongoose.model("item", schema)
module.exports=item