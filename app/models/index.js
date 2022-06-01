const mongoose = require('mongoose')
const db = {};
db.mongoose = mongoose
db.item = require('./item.model')
db.category = require('./category.model')
module.exports = db;