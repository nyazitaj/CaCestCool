const dbMongoCon = require('../models/models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const collectionComment = require('../services/comments')
const collectionPost = require('../services/posts')


/* Comments */

// Get comments list for a single post
let dataToReturn = {};
exports.getCommentsList = (req, res) => {
    res.status(200).json(req.body)

    collectionPost.findById({ _id: req.body.id }, function (err, post) {
        if (post) {
            collectionUsers.findById({ _id: post.userid }, (error, user) => {
                if (user) {
                    dataToReturn._id = post._id
                    dataToReturn.title = post.title
                    dataToReturn.content = post.content
                    dataToReturn.userid = post.userid
                    dataToReturn.nom = user.nom
                    dataToReturn.prenom = user.prenom
                    dataToReturn.createdat = post.createdat.toLocaleString("fr-FR");

                    res.status(200).json(dataToReturn)
                }

            })
        }
        else {
            res.status(400).json(err);
        }

    });
}

// Add a comment on a post
exports.addComment = (req, res) => {

    // Insert comment in database
    collectionComment.insertMany(req.body, (err, comment) => {
        if (err) {
            res.status(200).json(err)
        }
        else {
            res.status(200).json({
                message: 'Votre commentaire à été publié.'
            })
        }
    })

}