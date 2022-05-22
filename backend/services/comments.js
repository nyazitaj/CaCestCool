const dbMongoCon = require('../models/models');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Like schema
const commentToInsert = {
    userid: { type: String, required: true, index: true },
    postid: { type: String, required: true, index: true },
    comment: { type: String, required: true, index: true },
    createdat: { type: Date, default: Date.now },
}
const commentSchema = dbMongoCon.Schema(commentToInsert);
const collectionComment = dbMongoCon.model('comment',
    commentSchema
)

module.exports = collectionComment