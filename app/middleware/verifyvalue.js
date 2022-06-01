const db = require('../models/index')
const Item = db.item

checkduplicate = (req, res,next) => {
    Item.findOne({ name: req.body.name }).exec((err, user) => {

        if (err) {
            return res.status(500).send({message:err})
          
        }
        if (user) {
            return res.status(400).send({message:"Name Already exit"})
           
        }
        next()
        
    })
    
    
}
checkupdatevalid = (req, res, next) => {
    const update = Object.keys(req.body)
    const allowupdate = ['name', 'description']
    const valid = update.every((updates) => {
        allowupdate.includes(updates)
    })
    if (valid) {
        return res.status(400).send("You are not allowed to this update")
    }
    next()
}



module.exports = {
    checkduplicate,
    checkupdatevalid
}