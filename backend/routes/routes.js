const express = require('express')
const app = express()

/* const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); */

const controllers = require('../controllers/controllers');

// All the routes
app.get('/users-list', controllers.getListUsers)
app.get('/posts-list', controllers.getListPosts)
// app.post('/register-user', controllers.registerUser)

app.post('/register-user', (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
  })

module.exports = app