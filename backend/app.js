require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const router = express.Router();

const mongoose = require('mongoose');

// Creating Database connection
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const cluster = process.env.MONGO_URL;
const db = process.env.MONGO_DB;

mongoose.connect(
  "mongodb://" + cluster + "/" + db,
  {
    pass,
    user,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e) => console.log(e, 'Connexion à MongoDB échouée !'));




// const todosRoutes = require('./routes/todos');
// const { json } = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Welcome to CaCestCool project !')
})

// app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:8080'
// }));

// creation des routes de l'app
// app.get('/ping', (req, res) => {
//   res.status(200).send("PING OK test");
// });


/* app.get("/", (req, res) => {
  res.json(app);
}); */


// app.use('/api/v1/todos', todosRoutes);
// app.use('/api/v1/auth', authRoutes);

module.exports = app;