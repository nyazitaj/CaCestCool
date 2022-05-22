import React, { useState } from 'react';
import { port } from '../../classes/Classes';
import '../../App.css';
import profileImage from '../../assets/images/profile-image.png';

const axios = require('axios').default;

function ChangePassword() {

    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [retypePass, setRetypePass] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    const ChangeUserPass = (e) => {
        e.preventDefault();

        // Form validation
        let formFieldValue = {}
        formFieldValue.id = localStorage.getItem('id');
        setAlertMsg('');

        if (currentPass != '') { formFieldValue.currentPass = currentPass; } else { setAlertMsg('Saisissez votre mot de actuel.'); return; }
        if (newPass != '') { formFieldValue.newPass = newPass; } else { setAlertMsg('Saisissez votre nouveau mot de passe.'); return; }

        if (retypePass == '') { setAlertMsg('Ressaisissez votre nouveau mot de passe.'); return; }
        if (newPass != retypePass) { setAlertMsg('Les deux nouveaux mots de passe ne correspondent pas.'); return; }

        // Making an axios request to the server
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/change-password',
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
        <div className="change-password">
            <div className="title-container">
                    <h2>Changer mon mot de passe</h2>
            </div>

            <form id="signup" action="/api/cacestcool/register-user" method="post">
                <div className="input-row">
                    <input type="password" placeholder="Mot de passe actuel" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
                </div>

                <div className="input-row">
                    <input type="password" placeholder="Nouveau mot de passe" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                </div>

                <div className="input-row">
                    <input type="password" placeholder="Ressaisir le nouveau mot de passe" value={retypePass} onChange={(e) => setRetypePass(e.target.value)} />
                </div>

                <div className="button-row">
                    <button onClick={ChangeUserPass}>Changer</button>
                </div>

                {alertMsg != '' ?
                    <div className="alert-row">
                        <p id="alert-msg">{alertMsg}</p>
                    </div>
                    : false}
            </form>
        </div>

    );
}

export default ChangePassword;
