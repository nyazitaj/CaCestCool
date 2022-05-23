const dbMongoCon = require('../models/models');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer"); // it is not used


// User schema
const userToInsert = {
    email: { type: String, required: true, index: true },
    pass: { type: String, required: true, minlength: 6, /* select: false */ },
    nom: { type: String, required: true, minlength: 2, index: true },
    prenom: { type: String, required: true, minlength: 2, index: true },
    profileimage: { type: String, required: false, index: true },
    token: { type: String, minlength: 6, index: true }
}
const userSchema = dbMongoCon.Schema(userToInsert);

const collectionUsers = dbMongoCon.model('users',
    userSchema
)

module.exports = collectionUsers;