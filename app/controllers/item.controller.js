const db= require('../models/index')
const Item= db.item

const Category = db.category

exports.create = async (req, res) => {
    if (!req.body.name) {
       return res.status(400).send({ message: 'Name must be provided' })
    }
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    })
    item.save((err, item) => {
            if (err) {
                return res.status(500).send({ message: err })
            }

            if (req.body.category) {
                Category.find({
                    name: req.body.category
                }
                    , (err, category) => {
                        

                        item.category = category.map(category => category._id)
                        item.save(err => {
                            if (err) {
                                return res.status(500).send({ message: err })
                            }

                            return res.status(200).send(item)
                        })
                    })
               

            }

            

        })
    }

exports.delete = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ message: 'Id must be required' })
    }
    Item.findByIdAndDelete(req.params.id).then((data) => {
        if (!data) {
            res.status(404).send(`there is no data with this id`)
          
        }
        res.status(200).send(data)

    }).catch(err => {
        return res.status(500).send({ message: err })
    })


}
exports.deleteAll = (req, res) => {
    Item.deleteMany({}).then(() => {
        return res.status(200).send({message:'All item are deleted'})
    })

}
exports.update = (req, res) => {
    const data = req.body;
    
        Item.findByIdAndUpdate(req.params.id, data).then((data) => {
            if (!data) {
                res.status(404).send(`there is no data with this id`)
            }
            res.status(200).send("Update Succesfully")
        })

}
exports.getAll = (req, res) => {
    const { page, size } = req.query
    const limit = size ? size : 3
    const offset=(limit*page)-limit ?page:0

    Item.paginate({}, { limit, offset}).then((data) => {

        res.status(200).send(data)
    })


}
exports.get = async (req, res) => {

    Item.findById(req.params.id).populate('category').exec((err,data) => {


        if (err) {
            return res.status(500).send(`there is no data with this id`)

        }


        if (!data) {
            return res.status(404).send(`there is no data with this id`)

        }

       
        res.status(200).send(data)

    })
}
exports.findByTitle = (req, res) => {
    const title = req.body.title;
    var condition = title ? {
        title: { $regex: new RegExp(title), $options: "i"} } :{}
    Item.find(condition).then((data) => {
        res.status(200).send(data)

    }).catch(err => {
        res.status(500).send(err)
    })


}
