const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./app/models')
const Category = db.category;
var corsoption = {
    origin: "http://localhost:4200"
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsoption))
db.mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => {
    console.log("You are succesfully connected to database")
   
}).catch(err => {
    console.log("You are not connected to database")
})
Category.estimatedDocumentCount((err, count) => {

    if (!err && count == 0) {
        Category.insertMany([
            {
                name: 'mobile',
            }, {
                name: 'shampoo'
            },
            {
                name: 'bottle'
            }
        ])
    }
})



require('./app/router/item.route')(app)
require('./app/router/category.route')(app)
const port = process.env.PORT 

app.listen(port, () => {
    console.log(`Succesfully Listen to port ${port}`)
})
 