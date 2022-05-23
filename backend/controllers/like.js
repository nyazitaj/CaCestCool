const dbMongoCon = require('../models/models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const collectionLike = require('../services/like')
const collectionPost = require('../services/posts')


/* Like */

// Add a like on a post
exports.addLike = (req, res) => {
    req.body.like = true;

    // To avoid adding a like for its own user
    collectionPost.findById({ _id: req.body.postid }, (error, post) => {
        if (post) {

            if (post.userid == req.body.userid) {
                res.status(200).json({
                    error: 'Vous ne pouvez pas aimer votre propre post.'
                })
            }
            else {

                collectionLike.find({ postid: req.body.postid }).then((likes) => {

                    if (likes.length == 0 && likes.userid != req.body.userid) {
                        // Insert post data in database
                        collectionLike.insertMany(req.body, (err, like) => {
                            if (err) {
                                res.status(200).json(err)
                            }
                            else {
                                res.status(200).json({
                                    message: 'Un like a été ajouté.'
                                })
                            }
                        })
                    }

                })

            }
        }

    })

}