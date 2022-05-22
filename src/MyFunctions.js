/* import React from "react"; */
import React from 'react';
import { useNavigate, useHistory, Route, Navigate, PublicHomePage } from "react-router-dom";
import Signin from './component/login/Login';
import Dashboard from './component/dashboard/dashboard';
import {createBrowserHistory} from 'history';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';

let history = createBrowserHistory();

const axios = require('axios').default;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class MyFunctions {

    constructor() {
        // return 'Testy';
    }

    // Once the page is loaded, we add an event-listner "submit" on the submit form
    SignupUser = () => {

        if (document.querySelector('#signup')) {

            document.querySelector('#signup').addEventListener('submit', function (e) {
                e.preventDefault();

                // Making variables with the values of forms fields
                let msgError = document.querySelector('#alert-msg')
                let email = document.querySelector('#email')
                let pass = document.querySelector('#password')
                let retypePass = document.querySelector('#retype-pass')

                // Form validation
                let formFieldValue = {}
                msgError.innerHTML = '';

                if (email.value != '') {
                    formFieldValue.email = email.value;
                }
                else {
                    msgError.append('Une adresse email valide est requise.');
                    return;
                }

                if (pass.value != '') {
                    formFieldValue.pass = pass.value;
                }
                else {
                    msgError.append('Saisissez un mot de passe.');
                    return;
                }

                if (pass.value != retypePass.value) {
                    msgError.append('Les deux mots de passe ne correspondent pas.');
                    return;
                }

                // Making an axios request to the nodejs serer
                axios({
                    method: 'post',
                    baseURL: 'http://localhost:3001/api/cacestcool/register-user',
                    // responseType: 'json',

                    data: formFieldValue,

                    /* params: {
                        id: 12345
                    }, */

                    // withCredentials: true,

                    // headers: {
                    //     /* 'x-apikey': '59a7ad19f5a9fa0808f11931', */
                    //     'Access-Control-Allow-Origin': '*',
                    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    //     'X-Requested-With': 'XMLHttpRequest',
                    //     'Content-type': 'application/json',
                    //     "Content-Type": "multipart/form-data",
                    // },
                })

                    // axios.post("http://localhost:3001/api/cacestcool/register-user", myFormData, {
                    //     headers: {
                    //         'Content-type': 'application/json'
                    //     },
                    // })

                    .then(function (res) {
                        if (res.status == 200) {

                            if (res.data.error) {
                                msgError.innerHTML = res.data.error;
                                return;
                            }

                            if (res.data.message) {
                                msgError.innerHTML = res.data.message;
                            }

                            e.target.reset();

                            history.replace('/dashboard');

                            // let navigate = useNavigate();
                            // navigate("../dashboard", { replace: true });

                            /* const history = useHistory();
                            const goLogin = () => history.push('/dashbaord'); */

                            // res.data.token != ''?   <Route path="/dashboard" element={<dashboard />} /> : <Route path="/" element={<Signin />} />

                            {/* <Route exact path="/">
                                {!"loggedIn" ? <Navigate to="/dashboard" /> : <PublicHomePage />}
                            </Route> */}
                        }
                        else {
                            console.log("La requête a échoué")
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });

        }

    }

    LoginUser = () => {
        return 'Logged in';
    }

}
