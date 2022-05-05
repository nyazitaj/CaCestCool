const express = require('express')
const route = express.Router()

const controllers = require('../controllers/controllers')

// All the routes
route.get('/list-users', controllers.getListUsers)
route.get('/list-posts', controllers.getListPosts)

module.exports = route