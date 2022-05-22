const dbMongoCon = require('../models/models');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Post schema
const postToInsert = {
    title: { type: String, required: true, index: true },
    content: { type: String, required: true, minlength: 6, index: true },
    userid: { type: String, required: true, index: true },
    createdat: { type: Date, default: Date.now },
}
const postSchema = dbMongoCon.Schema(postToInsert);
const collectionPost = dbMongoCon.model('posts',
    postSchema
)

module.exports = collectionPost;