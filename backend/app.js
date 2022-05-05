require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');

app.use(express.static('public'))


app.use('/api/cacestcool/', routes);

/* app.use(cors()) */

app.use(cors({
    origin: 'http://localhost:3000'
}));




// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });



/* const verifyParams = require('./middleware/verifyParams'); */


app.post('/taj', /* verifyParams, */(req, res) => {

    res.header("Access-Control-Allow-Origin", "*");

    res.status(200).json({
        message: req.body
    })
});








// app.get('/', (req, res) => {
//     res.status(200).send('Welcome to CaCestCool project !')
// })

// app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:8080'
// }));


// app.get("/", (req, res) => {
//   res.json(mongoose);
// });


// app.use('/api/v1/todos', todosRoutes);
// app.use('/api/v1/auth', authRoutes);





module.exports = app;