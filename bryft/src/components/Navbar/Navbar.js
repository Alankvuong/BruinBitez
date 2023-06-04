import React, { useState } from "react";
import Modal from 'react-modal';
import { Link, Navigate } from "react-router-dom";
import {UserAuth} from '../../context/AuthContext'
import "./Navbar.css";
// import LoginForm from "../LoginForm";


function Navbar() {
    const {user, logOut} = UserAuth();
    const { googleSignIn } = UserAuth();
    
    const handleSignIn = async () => {
        try {
            await googleSignIn();            
        } catch(error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

    function openModal() {
        setIsOpen(true);
      }

    function closeModal() {
        setIsOpen(false);
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">BRYFT</Link>
            </div>
                <ul className="navbar-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/rides">Rides</Link>
                    </li>
                    <li>
                        <Link to="/user-profile">Profile</Link>
                    </li>
                    <li>
                        {user ? (
                            <button onClick={handleSignOut}>Logout</button>
                        ) : ( 
                        <div>
                            <button onClick={openModal} className="loginButton">Login</button>
                            <div className="modalContainer">
                                <Modal
                                    isOpen={modalIsOpen}
                                    // onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={{
                                        overlay: {
                                            // position: 'fixed',
                                            width: '100%',
                                            height: '100%',
                                            alignSelf: 'center',
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                        },
                                        content: {
                                            width: '30%',
                                            height: '75%',
                                            borderRadius: 34,
                                            boxShadow: 'rgba(0, 0, 0, 0.45) 0px 2px 10px',
                                            position: 'absolute',
                                            top: '12%',
                                            left: '34%',
                                            marginTop: '-1%',
                                        }
                                    }}
                                    contentLabel="Login Modal"
                                >
                                <div>
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                        <div className="popupLogo">
                                            BRYFT
                                        </div>
                                        <div onClick={closeModal} style={{borderWidth: 2, cursor: 'pointer'}}>
                                            <img src={require("../../assets/ex.png")} alt="exit button" className="exButton" />
                                        </div>
                                    </div>
                                    <div className="welcomeMessage">
                                        Welcome back!
                                    </div>
                                    <div className="descriptionMessage">
                                        Please enter your details to sign in.
                                    </div>
                                    {/* <button onClick={handleSignIn} className="signInButton">
                                        Sign In
                                    </button> */}
                                    <div className="signInButtonContainer">
                                        <div onClick={handleSignIn} className="googleContainer">
                                            <img src={require("../../assets/google-logo.png")} alt="google logo" className="googleLogo"/>
                                            <div className="googleText">Google</div>
                                        </div>
                                    </div>
                                    <div className="divideContainer">
                                        <hr style={{width: '44%', marginTop: '2.2%', color: 'lightgrey'}}/>
                                        <div>or</div>
                                        <hr style={{width: '44%', marginTop: '2.2%', color: 'lightgrey'}}/>
                                    </div>
                                    <div>
                                    
                                    </div>
                                </div>
                                </Modal>
                            </div>
                        </div>
                    )}
                    </li>
                </ul>
        </nav>
    )
}

export default Navbar;