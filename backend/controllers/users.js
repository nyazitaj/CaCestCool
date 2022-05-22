const dbMongoCon = require('../models/models');
const collectionUsers = require('../services/users')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // it is not used

dbMongoCon.Promise = global.Promise;

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

    // Form data validation
    if (req.body.email === '') {
        res.status(200).json({
            error: 'Une adresse email valide est requise.'
        })
        return;
    }

    if (req.body.pass === '') {
        res.status(200).json({
            error: 'Saisissez un mot de passe.'
        })
        return;
    }

    // Checking if email address is already used.
    collectionUsers.findOne({
        email: req.body.email
    })
        .then((data) => {
            if (data.email != '') {
                res.status(200).json({
                    error: 'Cette adresse email est déjà utilisée.',
                    email: data.email
                })
                return
            }
        })

    // Generating a token
    var token = jwt.sign(req.body, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    req.body.token = token;

    // Hashing the password
    const saltRounds = 10;

    req.body.pass = bcrypt.hash(req.body.pass, saltRounds, function (err, hash) {
        req.body.pass = hash;
        req.body.prenom = 'Prénom';
        req.body.nom = 'NOM';
        req.body.profileimage = '';

        // Inserting user data in database
        let dbData = new collectionUsers(req.body);

        dbData.save({})
            .then(() => {
                res.status(200).json({
                    email: req.body.email,
                    token: token,
                    message: 'Merci pour votre inscription'
                })
            }).catch(error => res.status(400).json({ error }))

    });
}

// User login
exports.loginUser = (req, res) => {

    // Form data validation
    // Checking if email is empty
    if (req.body.email === '') {
        res.status(200).json({
            error: 'Saisissez votre adresse email.'
        })
        return;
    }

    // Checking if Password is empty
    if (req.body.pass === '') {
        res.status(200).json({
            error: 'Saisissez votre mot de passe.'
        })
        return;
    }

    // Checking if email is registered
    collectionUsers.findOne({ email: req.body.email }, function (err, user) {

        if (!user) {
            res.status(200).json({ error: "L'adresse e-mail saisie n'existe pas." });
        }
        else {

            // Checking if password is correct
            bcrypt.compare(req.body.pass, user.pass, function (err, result) {
                if (!result) {
                    res.status(200).json({ error: "Veuillez vérifier votre mot de passe." });
                }
                else {

                    // Generating a token
                    var token = jwt.sign(req.body, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });

                    req.body.token = token;

                    // Updating the token
                    collectionUsers.findOneAndUpdate(
                        { email: req.body.email },
                        { $set: { token: token } },
                        (err, updatedDoc => {
                            if (err) return;
                            return updatedDoc;
                        })
                    )

                    res.status(200).json({
                        message: 'Connecté.',
                        token: token,
                        id: user._id
                    })

                }
            });
        }
    });





    // Checking if password for the given email is correct
    // collectionUsers.findOne({
    //     email: req.body.pass
    // })
    //     .then((data) => {
    //         if (data.email == '') {
    //             res.status(200).json({
    //                 error: "L'adresse e-mail n'est pas valide",
    //                 email: data.email
    //             })
    //             return
    //         }
    //     })
}

// Get user profile data
exports.getProfile = (req, res) => {

    // Checking if email is registered
    collectionUsers.findById({ _id: req.body.id }, function (err, user) {

        res.status(200).json(user)
    });
}

// Update user profile
exports.updateProfile = (req, res) => {

    // Form data validation
    // Checking if email is empty
    if (req.body.email === '') {
        res.status(200).json({
            error: 'Saisissez votre adresse email.'
        })
        return;
    }

    // Checking if Password is empty
    if (req.body.pass === '') {
        res.status(200).json({
            error: 'Saisissez votre mot de passe.'
        })
        return;
    }

    collectionUsers.findByIdAndUpdate(req.body.id, {
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom
    },
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                res.status(200).json({
                    message: 'Les données ont été mises à jour.'
                })
            }
        });
}

// Chnage user password
exports.updatePassword = (req, res) => {

    // Form data validation
    // Checking if new password is empty or not
    if (req.body.currentPass === '') {
        res.status(200).json({
            error: 'Saisissez votre mot de passe actuel.'
        })
        return;
    }

    // Checking if new password is empty or not
    if (req.body.newPass === '') {
        res.status(200).json({
            error: 'Saisissez votre nouveau mot de passe.'
        })
        return;
    }


    collectionUsers.findById({ _id: req.body.id }, function (err, user) {

        // Checking if current password is correct
        bcrypt.compare(req.body.currentPass, user.pass, function (err, result) {
            if (!result) {
                res.status(200).json({ error: "Veuillez vérifier votre mot de passe actuel." });
            }
            else {

                // Hashing the password
                const saltRounds = 10;

                bcrypt.hash(req.body.newPass, saltRounds, function (err, hash) {

                    // Inserting new password in database
                    collectionUsers.findByIdAndUpdate(req.body.id, {
                        pass: hash,
                    },
                        function (err, docs) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                res.status(200).json({
                                    message: 'Votre mot de passe a été mis à jour.'
                                })
                            }
                        });


                });

            }
        });
    });
}

// Logout a user
exports.logoutUser = (req, res) => {

    // Inserting new password in database
    collectionUsers.findByIdAndUpdate(req.body.id, {
        token: '',
    },
        function (err, docs) {
            if (err) {
                res.status(200).json(err)
            }
            else {
                res.status(200).json({
                    message: 'ok'
                })
            }
        });

}

// To recover the password
exports.recoverPassword = (req, res) => {

    // Form data validation
    // Checking if new password is empty or not
    if (req.body.email) {
        res.status(200).json({
            message: "Le but de cette requête est de récupérer son mot de passe, mais je ne l'ai pas terminé. La raison est qu'il n'est pas demandé par l'intervenant et en plus il utilise le package nodemailer."
        })
        return;
    }

    // Inserting new password in database
    collectionUsers.findByIdAndUpdate(req.body.id, {
        token: '',
    },
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                res.status(200).json({
                    message: 'ok'
                })
            }
        });

}