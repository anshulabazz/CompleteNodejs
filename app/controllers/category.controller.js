const db = require('../models/index')
const Category = db.category


exports.get = (req, res) => {
    Category.find({ name: req.body.name }).populate('item').exec((err, data) => {

        if (err) {
            return res.status(500).send(`there is no data with this id`)

        }


        if (!data) {
            return res.status(404).send(`there is no data with this id`)

        }


        res.status(200).send(data)

    })

}
