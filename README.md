

<p align="center"><a href="https://fr.reactjs.org/" target="_blank"><img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png" width="400"></a></p>

CaCestCool est a web training school project created by [Taj Nyazi](https://estracode.com) using React and NodeJS.

## CaCestCool


Les objectifs à atteindre :

  - Requêter les données requises **DONE**
  - Soumettre des changements (Création, suppression et modification) **DONE**
  - Se connecter et se déconnecter de l’application **DONE**
  - Afficher l'ensemble des posts de CaCestCool **DONE**
  - Afficher l'ensemble de mes posts **DONE**
  - Commenter tous les posts **DONE**
  - Aimer des posts **DONE**
    - pas les siens **DONE**
  - Ne pas pouvoir être redirigé vers la page de connexion si déjà connecté **DONE**
    - et donc me faire redirigé vers une page d'accueil **DONE**
  - Modifier les informations de mon profil  **DONE**
  - Changer son mot de passe  **DONE**
  - Uploader une image dans un post
  - Uploader une image de profil

# React Project

The frontend of this project is created using React framework and some other necessary features of React, while backend is done with Nodejs. The list of web technologies used in this project is below:
  - [React](https://fr.reactjs.org/)
  - [React Router](https://reactrouter.com/)
  - [Mongodb installation](https://www.mongodb.com/try/download/community)
  - [MongoDB Shell installation](https://www.mongodb.com/try/download/shell)
  - [Nodemon](https://www.npmjs.com/package/nodemon)
  - [express()](https://expressjs.com/en/5x/api.html#express)
  - [MongoDB](https://www.mongodb.com/docs/search/?q=insert)
  - [Axios](https://www.npmjs.com/package//axios)
  - [node.bcrypt.js](https://www.npmjs.com/package/bcrypt)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## frontend

Creating React application (on the PORT 3000, This port can be changed in src/classes/Classes.js file):
  - npx create-react-app .
  - npm start

Installing React-router in order to create multipages:
  - npm i -D react-router-dom

Axios
  - `npm install axios`

Documentation for creating routes:
  - [React Router on w3schools.com](https://www.w3schools.com/)](https://www.w3schools.com/react/react_router.asp)
  - [React Router on reactrouter.fr](https://reactrouter.com/docs/en/v6/getting-started/tutorial)


## Backend

Creating Database with MongoDB:
  - `mongosh`

  - `show dbs` **show all the databases**
  - `show users` **show all the users**
  - `db.dropUser("username")` **delete a user**

Create database **cacestcool**:
  - `use cacestcool`

Create new user for **cacestcool** database:
  - `db.createUser({ user: "foo", pwd: "123", roles: [{ role: "dbOwner", db: "cacestcool" }] })`

Insert data in **cacestcool** database:
  - `db.cacestcool.insert({name: "John Doe", age: 30})`

Installing some necessary packages:
  - `npm install express dotenv cors mongoose`

Connection to MongoDB:
I created a **.env** file with database information, then created **/backend/app.js** file to create the connection, then:

Creating a Server on the PORT 3001:
For this, I created **/backend/server.js**, then ran the server:
  - `cd backend/`
  - `node server.js`

In order to restart the server automatically with any changes in the project files are made, I installed **Nodemon**:
  - `npm install -g nodemon`
  - OR `npm install nodemon`
  - `cd backend`
  - `nodemon server.js`
  - (It is possible that you need to run the CLi as administrator to run **nodemon** commande)

node.bcrypt.js (A library to help you hash passwords)
  - `npm install bcrypt`

jsonwebtoken (An implementation of JSON Web Tokens)
  - `npm install jsonwebtoken`
  - `node` then `require('crypto').randomBytes(64).toString('hex')` to generate a **JWT_SECRET** for **.env** file


