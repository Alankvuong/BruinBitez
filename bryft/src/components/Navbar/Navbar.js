import React, { useState } from "react";
// import { Popup } from "reactjs-popup";
import Modal from 'react-modal';
import { Link, Navigate } from "react-router-dom";
import {UserAuth} from '../../context/AuthContext'
import "./Navbar.css";


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
                            <button onClick={openModal}>Open Modal</button>
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
                                {/* <button onClick={handleSignIn}>Sign In</button> */}
                                <div>
                                    <div className="popupLogo">
                                        BRYFT
                                    </div>
                                    <div className="welcomeMessage">
                                        Welcome back!
                                    </div>
                                    <div className="descriptionMessage">
                                        Please enter your details to sign in.
                                    </div>
                                    <button onClick={handleSignIn} className="signInButton">
                                        Sign In
                                    </button>
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