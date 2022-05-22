import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Logo, port } from '../../classes/Classes';

const axios = require('axios').default;


function PasswordRecovery() {

    const [email, setEmail] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    const RecoverPassword = (e) => {
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

        // Making an axios request to the server
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/recover-password',
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
        <div className="container password-recovery">
            <div className="logo-row">
                <Logo />
            </div>
            <form id="forgot-pass">
                <div className="input-row">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="button-row">
                    <button onClick={RecoverPassword}>Envoyer</button>
                </div>

                {alertMsg != '' ?
                    <div className="alert-row">
                        <p id="alert-msg">{alertMsg}</p>
                    </div>
                    : false}

                <div className="link-row">
                    <Link to="/" title="Se connecter">Connexion</Link>
                </div>
            </form>
        </div>

    );

}

export default PasswordRecovery;