const express = require('express')
module.exports = app => {
    const mid = require('../middleware/index')
    const router = express.Router()
    const controller = require('../controllers/item.controller')

    router.post('/', [mid.checkduplicate], controller.create)
    router.delete('/:id', controller.delete)
    router.delete('/', controller.deleteAll)
    router.put('/:id', [mid.checkupdatevalid] ,controller.update)
    router.get('/', controller.getAll)
    router.get('/get/:id', controller.get)
    router.get('/title', controller.findByTitle)
    app.use('/', router)
}