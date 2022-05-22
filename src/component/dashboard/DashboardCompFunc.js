import React, { useEffect, useState } from 'react';
import { Logo } from '../../classes/Classes';
import profileImage from '../../assets/images/annabelle-3.jpg';
import MyAccountForm from './MyAccountComp';
import MyWall from './MyWallComp';
import MyMessages from './MyMessagesComp';
import ChangePassword from './ChangePassword';
import { port } from '../../classes/Classes';
import { useNavigate } from "react-router-dom";

const axios = require('axios').default;


function DashboardComponent() {

    const [toDisplay, setToDisplay] = useState('my-wall');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [profileImg, setProfileImage] = useState(profileImage);
    const [getPostListByUserId, setGetPostListByUserId] = useState('');

    let navigate = useNavigate();

    useEffect(() => {

        // Getting and display user data for the first page load
        (() => {
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
                        // setProfileImage(res.data.profileimage)
                    }
                    else {
                        console.log("La requête a échoué")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        })();

    });

    const logoutUser = (e) => {
        e.preventDefault();

        // Form validation
        let formFieldValue = {}
        formFieldValue.id = localStorage.getItem('id');

        // Making an axios request to the server
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/logout-user',
            data: formFieldValue,
        })
            .then(function (res) {
                if (res.status == 200) {

                    console.log(res.data)

                    if (res.data.message && res.data.message == 'ok') {
                        localStorage.clear();
                        navigate("/", { replace: true });
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

    const addRemoveClass = (e) => {
        // console.log(document.getElementById("accordion-row").querySelectorAll("div"))
        let divList = document.querySelectorAll("#accordion-row div");
        divList.forEach(elem => {
            elem.classList.remove('current');
        });
        e.target.classList.add('current')

        setToDisplay(e.target.getAttribute('my-attr'))

        // getPostListByUserId()
    }

    return (
        <div className="container dashboard">
            <div className="row">
                <div className="column-left">
                    <div className="logo-row">
                        <Logo />
                    </div>
                    <div className="profile-image-row">
                        <img src={profileImg} alt="" />
                    </div>
                    <div className="name-row">
                        <h2>{prenom} {nom}</h2>
                    </div>
                    <div id="accordion-row"className="accordion-row">
                        <div onClick={addRemoveClass} my-attr="my-wall" className="current">Mon mur<span title="12 nouveauxx posts depuis votre dernière visite">12</span></div>
                        <div onClick={addRemoveClass} my-attr="my-message">Mes messages<span title="3 nouveauxx commentaires sur vos dernière posts">3</span></div>
                        <div onClick={addRemoveClass} my-attr="my-account">Mon compte</div>
                        <div onClick={addRemoveClass} my-attr="change-pass">Mot de passe</div>
                        <div onClick={logoutUser}>Déconnexion</div>
                    </div>
                </div>

                <div className="column-right">
                    {toDisplay == 'my-wall' ? <MyWall sendDataToParent={setGetPostListByUserId} /> : false}
                    {toDisplay == 'my-message' ? <MyMessages sendDataToParent={setGetPostListByUserId} /> : false}
                    {toDisplay == 'my-account' ? <MyAccountForm setPrenom={setPrenom} setNom={setNom} setProfileImage={setProfileImage} /> : false}
                    {toDisplay == 'change-pass' ? <ChangePassword /> : false}
                </div>
            </div>
        </div>
    );

}

export default DashboardComponent;