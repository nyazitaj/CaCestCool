const dbMongoCon = require('../models/models');
/* const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); */

const collectionUsers = dbMongoCon.model('users',
    dbMongoCon.Schema()
)
const collectionPost = dbMongoCon.model('posts',
    dbMongoCon.Schema()
)

/* Users */
// Display user list
exports.getListUsers = (req, res) => {

    collectionUsers.find({}).then((data) => {

        res.status(200).json(
            data
        )

    });
}

// User registration
exports.registerUser = (req, res) => {
    res.status(200).json({
        message: req.body
    })

    /* if (!req.body.email) {
        res.status(400).json({ error: 'Email est obligatoire' })
    } */

    /* const collectionUsers = new Todo({
        ...req.body
    }) */

    /* collectionUsers.save().then(() => {
        res.status(201).json({
            message: 'Merci pour votre inscription'
        })
    }).catch(error => res.status(400).json({ error })) */
}


/* Post */

// Display posts list
exports.getListPosts = (req, res) => {

    collectionPost.find({}).then((data) => {

        res.status(200).json(
            data
        )

    });

}