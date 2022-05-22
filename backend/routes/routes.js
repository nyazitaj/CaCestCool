const express = require('express')
const app = express()

const users = require('../controllers/users');
const posts = require('../controllers/posts');
const like = require('../controllers/like');
const comments = require('../controllers/comments');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(express.json())


// All the routes
// User
app.get('/users-list', users.getListUsers)
app.post('/register-user', users.registerUser);
app.post('/login-user', users.loginUser);
app.post('/user-profile', users.getProfile);
app.post('/update-profile', users.updateProfile);
app.post('/change-password', users.updatePassword);
app.post('/logout-user', users.logoutUser);
app.post('/recover-password', users.recoverPassword);

// Posts
app.get('/posts-list', posts.getPostsList)
app.post('/add-post', posts.addPost);
app.post('/posts-list-by-userid', posts.postsListByUserId);
app.post('/get-single-post', posts.getOnePostById);

// Like
app.post('/add-like', like.addLike);

// Comments
app.post('/comments-list', comments.getCommentsList);
app.post('/add-comment', comments.addComment);


module.exports = app