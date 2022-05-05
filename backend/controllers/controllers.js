const dbMongoCon = require('../models/models');

const collectionUsers = dbMongoCon.model('users',
    dbMongoCon.Schema()
)
const collectionPost = dbMongoCon.model('posts',
    dbMongoCon.Schema()
)

// Display user list
exports.getListUsers = (req, res) => {

    collectionUsers.find({}).then((data) => {

        res.status(200).json(
            data
        )

    });

}

// Display posts list
exports.getListPosts = (req, res) => {

    collectionPost.find({}).then((data) => {

        res.status(200).json(
            data
        )

    });

}