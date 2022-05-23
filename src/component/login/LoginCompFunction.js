import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Logo, port } from '../../classes/Classes';
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;


function LoginForm() {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    let navigate = useNavigate();

    const SignupUser = (e) => {
        e.preventDefault();

        // Form validation
        let formFieldValue = {}
        setAlertMsg('');

        if (email != '') {
            formFieldValue.email = email;
        }
        else {
            setAlertMsg('Saisissez votre adresse email.');
            return;
        }

        if (pass != '') {
            formFieldValue.pass = pass;
        }
        else {
            setAlertMsg('Saisissez votre mot de passe.');
            return;
        }

        // Making an axios request to the server
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/login-user',
            data: formFieldValue,
        })
            .then(function (res) {
                if (res.status == 200) {

                    if (res.data.error) {
                        setAlertMsg(res.data.error)
                        return;
                    }

                    if (res.data.message) {
                        setAlertMsg(res.data.message)
                    }

                    localStorage.setItem('id', res.data.id)
                    localStorage.setItem('token', res.data.token)
                    window.location.reload();
                    navigate("../dashboard", { replace: true });
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
        <div className="container login">
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

                <div className="button-row">
                    <button onClick={SignupUser}>Se connecter</button>
                </div>

                {alertMsg != '' ?
                    <div className="alert-row">
                        <p id="alert-msg">{alertMsg}</p>
                    </div>
                    : false}

                <div className="link-row">
                    <Link to="/forgot-password" title="Mot de passe perdu ?">Mot de passe perdu ?</Link>
                </div>

                <div className="link-row">
                    <Link to="/signup" title="S'enregistrer">S'enregistrer</Link>
                </div>
            </form>
        </div>
    );

}

export default LoginForm;