/* import React from "react"; */
const axios = require('axios').default;

export default class MyFunctions {

    constructor() {
        // return 'Testy';
    }

    SignupUser = () => {
        document.querySelector('#signup').addEventListener('submit', function (e) {
            e.preventDefault();

            const myFormData = new FormData(this);

            /* for (var value of myFormData.values()) {
                console.log(value);
            } */

            /* fetch('http://localhost:3001/taj', {
                mode: 'cors',
                credentials: 'include'
              })
            .then(req => {
                req.json()
            })
            .then(data => {
                console.log(data)
            })
            .catch(error => console.log('Authorization failed : ' + error.message)); */

            axios({
                method: 'post',
                baseURL: 'http://localhost:3001/taj',
                data: {
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                },
                // withCredentials: true,
                headers: {
                    /* 'x-apikey': '59a7ad19f5a9fa0808f11931', */
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
            });
        });
    }

    LoginUser = () => {
        return 'Logged in';
    }

}
