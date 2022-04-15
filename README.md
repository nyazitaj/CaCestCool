

<p align="center"><a href="https://fr.reactjs.org/" target="_blank"><img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png" width="400"></a></p>

CaCestCool est a web training school project created by [Taj Nyazi](https://estracode.com) using React and NodeJS.

## CaCestCool

The frontend of this project is created using React framework and some other necessary features of React. Some are listed below :
- [React](https://fr.reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Mongodb installation](https://www.mongodb.com/try/download/community)
- [MongoDB Shell installation](https://www.mongodb.com/try/download/shell)




# React Project

## frontend

Creating React application:
  - npx create-react-app .
  - npm start

Installing React-router in order to create multipages:
  - npm i -D react-router-dom

Documentation for creating routes:
  - [React Router on w3schools.com](https://www.w3schools.com/)](https://www.w3schools.com/react/react_router.asp)
  - [React Router on reactrouter.fr](https://reactrouter.com/docs/en/v6/getting-started/tutorial)


## Backend

Creating Database with MongoDB:
  - mongosh

  - use cacestcool
  - db.user.insert({name: "John Doe", age: 30})
  - db.user.insert({name: "Nyazi Taj", age: 37})

  - show dbs

  - db.createUser({ user: "foo", pwd: "123", roles: [{ role: "dbOwner", db: "cacestcool" }] })

Installing some necessary packages:
  - npm install express dotenv cors
  - npm install mongoose

Connection to MongoDB:
I created a **.env** file with database information, then created **/backend/app.js** file to create the connection, then:

Creating a Server on the PORT 3001:
For this, I created **/backend/server.js**, then ran the server:
  - cd backend/
  - node server.js
