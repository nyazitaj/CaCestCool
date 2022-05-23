const dbMongoCon = require('../models/models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const collectionPost = require('../services/posts')
const collectionUsers = require('../services/users');
const collectionLike = require('../services/like');



/* Post */

// Display posts list
exports.getPostsList = (req, res) => {
    let postsArray = []

    collectionPost.find({}).then((posts) => {

        collectionLike.find({}).then((likes) => {

            posts.forEach((post) => {
                let postsObj = {}

                postsObj._id = post._id
                postsObj.userid = post.userid
                postsObj.content = post.content
                postsObj.title = post.title
                postsObj.createdat = post.createdat.toLocaleString("fr-FR")

                let ctLike = 0
                likes.forEach((like) => {
                    if (like.postid == post._id) {
                        ctLike += 1
                    }
                });

                postsObj.likes = ctLike

                postsArray.push(postsObj)
            });

            res.status(200).json(
                postsArray = postsArray.reverse()
            )
        })

    })

}

// Add new post
exports.addPost = (req, res) => {

    // Form data validation
    if (req.body.titre === '') {
        res.status(200).json({
            error: 'Donnez un titre à votre post.'
        })
        return;
    }

    if (req.body.content === '') {
        res.status(200).json({
            error: 'Ajouter une description à votre post.'
        })
        return;
    }

    // Insert post data in database
    collectionPost.insertMany(req.body, (error, posts) => {
        if (error) {
            res.status(200).json(error)
        }
        else {
            res.status(200).json({
                message: 'Le post a été ajouté.'
            })
        }
    })

}

// Get posts list by user id
exports.postsListByUserId = (req, res) => {
    let postsArray = []

    collectionPost.find({ userid: req.body.userid }).then((posts) => {

        collectionLike.find({}).then((likes) => {

            posts.forEach((post) => {
                let postsObj = {}

                postsObj._id = post._id
                postsObj.userid = post.userid
                postsObj.content = post.content
                postsObj.title = post.title
                postsObj.createdat = post.createdat.toLocaleString("fr-FR")

                let ctLike = 0
                likes.forEach((like) => {
                    if (like.postid == post._id) {
                        ctLike += 1
                    }
                });

                postsObj.likes = ctLike

                postsArray.push(postsObj)
            });

            res.status(200).json(
                postsArray = postsArray.reverse()
            )
        })

        // res.status(200).json(
        //     posts = posts.reverse()
        // )

    });
}

// Get a signle post by its id
let dataToReturn = {};
exports.getOnePostById = (req, res) => {

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