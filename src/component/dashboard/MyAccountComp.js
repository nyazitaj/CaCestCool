import React, { useEffect, useState } from 'react';
import { port } from '../../classes/Classes';
import '../../App.css';
import profileImage from '../../assets/images/profile-image.png';

const axios = require('axios').default;

let firstTimeLodading = true;

function MyAccountForm(props) {

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [profileImg, setProfileImage] = useState('');
    const [imageSelectedText, setImageSelectedText] = useState('Parcourir une image...');
    const [alertMsg, setAlertMsg] = useState('');

    // Getting and display user data for the first page load
    const LoadUserData = () => {
        let formFieldValue = {}
        formFieldValue.id = localStorage.getItem('id');

        // Making an axios request
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/user-profile',
            data: formFieldValue
        })
            .then(function (res) {
                if (res.status == 200) {
                    setNom(res.data.nom)
                    setPrenom(res.data.prenom)
                    setEmail(res.data.email)
                    setProfileImage(res.data.profileimage)

                    // Data to transfer to the parent component
                    props.setPrenom(res.data.prenom)
                    props.setNom(res.data.nom)
                    props.setProfileImage(res.data.profileimage)
                }
                else {
                    console.log("La requête a échoué")
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        firstTimeLodading = false;
    }

    useEffect(() => {
        if (firstTimeLodading) {
            LoadUserData();
        }
    });

    // Update user data
    const UpdateProfile = (e) => {
        e.preventDefault();
        firstTimeLodading = true;

        // Form validation
        let formFieldValue = {}
        formFieldValue.id = localStorage.getItem('id');

        setAlertMsg('');

        if (prenom != '') { formFieldValue.prenom = prenom; } else { setAlertMsg('Saisissez votre prénom.'); return; }
        if (nom != '') { formFieldValue.nom = nom; } else { setAlertMsg('Saisissez votre nom.'); return; }
        if (email != '') { formFieldValue.email = email; } else { setAlertMsg('Saisissez votre adresse email.'); return; }

        // Making an axios request to the server
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/update-profile',
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
        <div className="my-account">
            <div className="title-container">
                <h2>Mes données personnelles</h2>
            </div>
            <form id="signup" action="/api/cacestcool/register-user" method="post">

                <div className="input-row">
                    <input type="text" id="prenom" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                </div>

                <div className="input-row">
                    <input type="text" id="nom" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>

                <div className="input-row">
                    <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-row">
                    <label htmlFor="file-upload" className="custom-file-upload">{imageSelectedText}</label>
                    <input type="file" id="file-upload" accept="image/*" onChange={(e) => {
                        setProfileImage(e.target.value);
                        e.target.value == '' ? setImageSelectedText('Parcourir une image...') : setImageSelectedText(e.target.value)
                    }} />
                </div>

                <div className="button-row">
                    <button onClick={UpdateProfile}>Sauvegarder</button>
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

export default MyAccountForm;
