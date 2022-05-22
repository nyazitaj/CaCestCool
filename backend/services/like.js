const dbMongoCon = require('../models/models');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Like schema
const likeToInsert = {
    userid: { type: String, required: true, index: true },
    postid: { type: String, required: true, index: true },
    like: { type: Boolean, required: true, index: true },
}
const likeSchema = dbMongoCon.Schema(likeToInsert);
const collectionLike = dbMongoCon.model('like',
    likeSchema
)

module.exports = collectionLike;