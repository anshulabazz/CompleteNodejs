const express = require('express')

const router = express.Router()
module.exports = app => {
    const controller = require('../controllers/category.controller')
    router.get('/', controller.get)
   
    app.use('/category',router)
}