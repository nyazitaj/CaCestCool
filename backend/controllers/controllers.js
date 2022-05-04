const Todo = require('../models/models');


// Display list
exports.getList = (req, res) => {

    Todo.find({}).then((data) => {

        res.status(200).json(
            data
        )

    });

}