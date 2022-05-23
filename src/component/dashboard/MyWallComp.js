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

function MyWall(props) {

    const [postList, setPostList] = useState('');

    // Function to posts list for current user
    const GetPostsList = () => {

        // Making an axios request
        axios({
            method: 'get',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/posts-list',
        })
            .then(function (res) {
                if (res.status == 200) {
                    setPostList(res.data)
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
            // Sending the GetPostsList() to the parent, for loading the posts list while navigating in side menu
            props.sendDataToParent(GetPostsList)

            GetPostsList();
        }
    });

    const [comment, setComment] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [btnTextNewPost, setBtnTextNewPost] = useState('Nouveau post');

    const InserNewComment = (e) => {
        e.preventDefault();

        // Form validation
        let formFieldValue = {}
        setAlertMsg('');

        if (comment != '') { formFieldValue.comment = comment; } else { setAlertMsg('Ajouter du contenu à votre commentaire.'); return; }

        formFieldValue.userid = localStorage.getItem('id');
        formFieldValue.postid = e.target.getAttribute('post-id');

        // Making an axios request to the server
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/add-comment',
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

                        setComment('');
                    }
                }
                else {
                    console.log("La requête a échoué")
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        GetPostsList()
        GetCommentList(
            localStorage.getItem('id'),
            e.target.getAttribute('post-id')
        )
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

                    GetCommentList(
                        localStorage.getItem('id'),
                        e.target.getAttribute('post-id')
                    )
                }
                else {
                    console.log("La requête a échoué")
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        GetPostsList();

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


        GetPostsList();
    }

    const [commentList, setCommentList] = useState('');

    // Get comments list for a single user
    const GetCommentList = (userid, postid) => {

        let formFieldValue = {}

        formFieldValue.userid = userid;
        formFieldValue.postid = postid;

        // Making an axios request
        axios({
            method: 'post',
            baseURL: 'http://localhost:' + port + '/api/cacestcool/comments-list',
            data: formFieldValue,
        })
            .then(function (res) {
                if (res.status == 200) {
                    setCommentList(res.data)
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

    return (
        <div className="column-right-inner">
            <div className="post-list">
                <div className="title-container">
                    <h2>Mon mur</h2>
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
                                            <p>{val.content.length > 30 ? val.content.substring(0, 80) + ' ...' : val.content} <span className="see-full-post" post-id={val._id} user-id={val.userid} onClick={getOnePostById}>Voir le post</span></p>
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
                                commentList.length > 0 ?
                                    commentList.map((val, key) => {
                                        return <div className="post-list-container" key={key}>
                                            <div className="post-row">
                                                <div className="post-col-image">
                                                    <img src={profileImage} atl="Profile image" with="55" height="55" />
                                                    <p>{val.createdat}</p>
                                                </div>

                                                <div className="post-col-text">
                                                    <div className="post-text">
                                                        <h2>{val.prenom} {val.nom}</h2>
                                                        <p>{val.comment}</p>
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
                                        <textarea rows="6" value={comment} onChange={(e) => setComment(e.target.value)} />
                                    </div>

                                    <div className="button-row">
                                        <button onClick={InserNewComment} post-id={singlePost._id}>Envoyer<img src={rightArrow} alt="right-arrow" /></button>
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

export default MyWall;
