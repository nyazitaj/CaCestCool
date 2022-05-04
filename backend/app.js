require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');
// const cors = require('cors');


app.use('/api/cacestcool/', routes);








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