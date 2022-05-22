import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Logo, port } from '../../classes/Classes';

const axios = require('axios').default;


function SignupFunction() {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [retypePass, setRetypePass] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    const SignupUser = (e) => {
        e.preventDefault();

        // Form validation
        let formFieldValue = {}
        setAlertMsg('');

        if (email != '') {
            formFieldValue.email = email;
        }
        else {
            setAlertMsg('Une adresse email valide est requise.');
            return;
        }

        if (pass != '') {
            formFieldValue.pass = pass;
        }
        else {
            setAlertMsg('Saisissez un mot de passe.');
            return;
        }

        if (pass != retypePass) {
            setAlertMsg('Les deux mots de passe ne correspondent pas.');
            return;
        }

        // Making an axios request to the server
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/register-user',
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
                        setAlertMsg(res.data.error)
                        return;
                    }

                    if (res.data.message) {
                        setAlertMsg(res.data.message)
                    }

                    setEmail('')
                    setPass('')
                    setRetypePass('')

                    localStorage.setItem('token', res.data.token)
                }
                else {
                    console.log("La requête a échoué")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="container signup">
            <div className="logo-row">
                <Logo />
            </div>
            <form id="signup" action="/api/cacestcool/register-user" method="post">

                <div className="input-row">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-row">
                    <input type="password" placeholder="Mot de passe" value={pass} onChange={(e) => setPass(e.target.value)} />
                </div>

                <div className="input-row">
                    <input type="password" placeholder="Confirmer le mot de passe" value={retypePass} onChange={(e) => setRetypePass(e.target.value)} />
                </div>

                <div className="button-row">
                    <button onClick={SignupUser}>S'enregistrer</button>
                </div>

                {alertMsg != '' ?
                    <div className="alert-row">
                        <p id="alert-msg">{alertMsg}</p>
                    </div>
                    : false}

                <div className="link-row">
                    <Link to="/" title="Mot de passe perdu ?">Vous avez déjà un compte ?</Link>
                </div>
            </form>
        </div>
    );

}

export default SignupFunction;