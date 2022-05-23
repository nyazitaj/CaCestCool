import React, { useEffect, useState } from 'react';
import { port } from '../../classes/Classes';
import '../../App.css';
import profileImage from '../../assets/images/profile-image.png';
import rightArrow from '../../assets/images/right-arrow.png';
import annabelle1 from '../../assets/images/annabelle-1.jpg';
import btnComment from '../../assets/images/comment.png';
import btnLike from '../../assets/images/like.png';
import { Link } from 'react-router-dom';

const axios = require('axios').default;

let firstTimeLodading = true;

function MyMessages(props) {

    const [postList, setPostList] = useState('');

    // Function to posts list for current user
    const GetPostListByUserId = () => {

        let formFieldValue = {}
        formFieldValue.userid = localStorage.getItem('id');

        // Making an axios request
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/posts-list-by-userid',
            data: formFieldValue,
        })
            .then(function (res) {
                if (res.status == 200) {
                    setPostList(res.data)

                    console.log(res.data)
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
            // Sending the GetPostListByUserId() to the parent, for loading the posts list while navigating in side menu
            props.sendDataToParent(GetPostListByUserId)

            GetPostListByUserId();
        }
    });

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postImage, setPostImage] = useState('');
    const [imageSelectedText, setImageSelectedText] = useState('Parcourir une image...');
    const [alertMsg, setAlertMsg] = useState('');
    const [btnTextNewPost, setBtnTextNewPost] = useState('Nouveau post');

    const InserNewPost = (e) => {
        e.preventDefault();

        // Form validation
        let formFieldValue = {}
        setAlertMsg('');

        if (title != '') { formFieldValue.title = title; } else { setAlertMsg('Donnez un titre à votre post.'); return; }
        if (content != '') { formFieldValue.content = content; } else { setAlertMsg('Ajouter une description à votre post.'); return; }
        // if (postImage != '') { formFieldValue.postImage = postImage; } else { setAlertMsg('Ajouter une image à votre post.'); return; }

        formFieldValue.userid = localStorage.getItem('id');

        // Making an axios request to the server
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/add-post',
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

                        setTitle('');
                        setContent('');
                        setPostImage('');
                    }
                }
                else {
                    console.log("La requête a échoué")
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        GetPostListByUserId();
    }

    const newPost = (e) => {
        document.querySelector('#new-post-container').classList.toggle('d-none')

        let currentText = btnTextNewPost;
        setBtnTextNewPost(e.target.getAttribute('btn-text'));
        e.target.setAttribute('btn-text', currentText);

    }

    // Get a signle post by its id
    const [singlePost, setSinglePost] = useState('');

    const getOnePostById = (e) => {

        let formFieldValue = {}

        formFieldValue.id = e.target.getAttribute('post-id');

        // Making an axios request to the server
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/get-single-post',
            data: formFieldValue,
        })
            .then(function (res) {
                if (res.status == 200) {
                    setSinglePost(res.data)
                }
                else {
                    console.log("La requête a échoué")
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        GetPostListByUserId();

    }

    // Add a like on a post

    const addLike = (e) => {

        let formFieldValue = {}

        formFieldValue.userid = localStorage.getItem('id');
        formFieldValue.postid = e.target.getAttribute('post-id');

        // Making an axios request to the server
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/add-like',
            data: formFieldValue,
        })
            .then(function (res) {
                if (res.status == 200) {

                    if (res.data.error) {
                        console.log(res.data.error)
                        return;
                    }

                    if (res.data.message) {
                        console.log(res.data.message)
                    }
                }
                else {
                    console.log("La requête a échoué")
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        GetPostListByUserId();
    }

    return (
        <div className="column-right-inner">
            <div className="post-list">
                <div className="title-container">
                    <button onClick={newPost} btn-text="Annuler">{btnTextNewPost}</button>
                    <h2>Mes messages</h2>
                </div>

                <div id="new-post-container" className="new-post-container d-none">
                    <form id="signup" action="/api/cacestcool/register-user" method="post">
                        <div className="title-row">
                            <h3>Nouveau post</h3>
                        </div>

                        <div className="input-row">
                            <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="input-row">
                            <textarea placeholder="Contenu du post" rows="7" value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>

                        <div className="input-row">
                            <label htmlFor="file-upload" className="custom-file-upload">{imageSelectedText}</label>
                            <input type="file" id="file-upload" accept="image/*" onChange={(e) => {
                                setPostImage(e.target.value);
                                e.target.value == '' ? setImageSelectedText('Parcourir une image...') : setImageSelectedText(e.target.value)
                            }} />
                        </div>

                        <div className="button-row">
                            <button onClick={InserNewPost}>Ajouter</button>
                        </div>

                        {alertMsg != '' ?
                            <div className="alert-row">
                                <p id="alert-msg">{alertMsg}</p>
                            </div>
                            : false}
                    </form>
                </div>

                {
                    postList.length > 0 ?
                        postList.map((val, key) => {
                            return <div className="post-list-container" key={key}>
                                <div className="post-row">
                                    <div className="post-col-image">
                                        <img src={profileImage} atl="Profile image" with="55" height="55" />
                                    </div>

                                    <div className="post-col-text">
                                        <div className="post-text">
                                            <h2>{val.title.length > 30 ? val.title.substring(0, 35) + ' ...' : val.title}</h2>
                                            <p>{val.content.length > 30 ? val.content.substring(0, 80) + ' ...' : val.content} <span className="see-full-post" post-id={val._id} onClick={getOnePostById}>Voir le post</span></p>
                                        </div>
                                    </div>
                                    <div className="post-icons">
                                        {/* <span comment-id={val._id}>{val.likes} <img src={btnComment} atl="Comments" with="25" height="25" /></span> */}
                                        <span post-id={val._id} className={val.userid != localStorage.getItem('id') ? 'clickable' : ''} onClick={addLike}>{val.likes} <img src={btnLike} atl="Like" with="25" height="25" post-id={val._id} onClick={addLike} /></span>
                                    </div>
                                </div>
                            </div>
                        }) :
                        false
                }
            </div>

            {
                singlePost ?

                    <div className="post-view">
                        <div className="date-row">
                            <span>{singlePost.createdat}</span>
                            {/* <button onClick={InserNewPost}>Commenter</button> */}
                        </div>

                        <div className="title-row">
                            <h3>{singlePost.title}</h3>
                            <p>par {singlePost.prenom} {singlePost.nom}</p>
                            <p>16 likes</p>
                        </div>

                        <div className="image-row">
                            <img src={annabelle1} alt="Post-title" />
                        </div>

                        <div className="content-row">
                            <p>{singlePost.content}</p>
                        </div>

                        <div className="comments-row">
                            {
                                postList.length > 0 ?
                                    postList.map((val, key) => {
                                        return <div className="post-list-container" key={key}>
                                            <div className="post-row">
                                                <div className="post-col-image">
                                                    <img src={profileImage} atl="Profile image" with="55" height="55" />
                                                    <p>12:12</p>
                                                    <p>01/04/2021</p>
                                                </div>

                                                <div className="post-col-text">
                                                    <div className="post-text">
                                                        <h2>Taj Nyazi</h2>
                                                        <p>{val.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }) :
                                    false
                            }
                        </div>

                        <div className="new-comment-row">
                            <div id="new-post-container" className="new-post-container">
                                <form id="signup" action="/api/cacestcool/register-user" method="post">

                                    <div className="input-row">
                                        <textarea rows="6" value={content} onChange={(e) => setContent(e.target.value)} />
                                    </div>

                                    <div className="button-row">
                                        <button onClick={InserNewPost}>Envoyer<img src={rightArrow} alt="right-arrow" /></button>
                                    </div>

                                    {alertMsg != '' ?
                                        <div className="alert-row">
                                            <p id="alert-msg">{alertMsg}</p>
                                        </div>
                                        : false}
                                </form>
                            </div>
                        </div>
                    </div>
                    : false
            }

        </div>
    );
}

export default MyMessages;
