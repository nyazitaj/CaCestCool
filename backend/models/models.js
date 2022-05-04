
const mongoose = require('mongoose')


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

const toInsert = {
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, minlength: 6, select: false }
}

// Creating table in cacesttool database
const userSchema = mongoose.Schema(/* toInsert */);

module.exports = mongoose.model('cacestcool', userSchema);