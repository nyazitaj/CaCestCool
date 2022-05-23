const dbMongoCon = require('../models/models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const collectionComment = require('../services/comments')
const collectionPost = require('../services/posts');
const collectionUsers = require('../services/users');


/* Comments */

// Get comments list for a single post
exports.getCommentsList = (req, res) => {
    let commentsArray = []

    collectionComment.find({ postid: req.body.postid }).then((comments) => {

        collectionUsers.find({}).then((users) => {

            comments.forEach((comment) => {
                let commentObj = {}

                commentObj._id = comment._id
                commentObj.comment = comment.comment
                commentObj.createdat = comment.createdat.toLocaleString("fr-FR")

                users.forEach((user) => {
                    if (user._id == comment.userid) {
                        commentObj.nom = user.nom
                        commentObj.prenom = user.prenom
                    }
                });

                commentsArray.push(commentObj)
            });

            res.status(200).json(
                comments = commentsArray
            )

        });

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