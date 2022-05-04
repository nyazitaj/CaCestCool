const express = require('express')
const route = express.Router()

const controllers = require('../controllers/controllers')

// All the routes
route.get('/list', controllers.getList)

module.exports = route