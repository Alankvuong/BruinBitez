import React, { useState } from "react";
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";
import {UserAuth} from '../../context/AuthContext'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase'
import "./Navbar.css";

function Navbar() {
    const {user, logOut} = UserAuth();
    const { googleSignIn } = UserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate()

    const handleToggleMode = () => {
        setIsSignUp(!isSignUp);
        setError(""); // Clear the error message
        setEmail("");
        setPassword("");
      };

    const handleSignUp = async () => {
        
        try {
          // Email domain regex pattern
          const emailDomainRegex = /@(ucla\.edu|g\.ucla\.edu)$/;
      
          // Password regex pattern
          const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
      
          // Check if the email matches the domain pattern
          if (!emailDomainRegex.test(email)) {
            setError("Please enter an email that ends with ucla.edu or g.ucla.edu");
            return;
          }
      
          // Check if the password matches the required pattern
          if (!passwordRegex.test(password)) {
            setError(
              "Password must be at least 8 characters and contain at least: 1 uppercase, 1 number, and 1 symbol"
            );
            return;
          }
      
          await createUserWithEmailAndPassword(auth, email, password);
          closeModal(); // Close the modal after successful signup
          navigate('/new-user-sign-up');
        } catch (error) {
          setError(error.message);
        }
    };
      
    
    const handleLogin = async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          closeModal(); // Close the modal after successful login
        } catch (error) {
            setError("Please enter a valid email or password");
        }
      };
    
    const handleSignIn = async () => {
        try {
            await googleSignIn();            
        } catch(error) {
            console.log(error);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await googleSignIn();
            navigate('/new-user-sign-up');   
        } catch(error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut()
            setError(""); // Clear the error message
            setEmail("");
            setPassword("");
            navigate('/');   
        } catch (error) {
            console.log(error)
        }
    }

    function openModal() {
        setIsOpen(true);
      }

    function closeModal() {
        setIsOpen(false);
        setError(""); // Clear the error message
        setIsSignUp(false);
    }

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
                            <button onClick={handleSignOut} className="logoutButton">Logout</button>
                        ) : ( 
                        <div>
                            <button onClick={openModal} className="loginButton">Login</button>
                            <div className="modalContainer">
                                <Modal
                                    isOpen={modalIsOpen}
                                    style={{
                                        overlay: {
                                            width: '100%',
                                            height: '100%',
                                            alignSelf: 'center',
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                        },
                                        content: {
                                            width: '30%',
                                            height: '80%',
                                            borderRadius: 34,
                                            boxShadow: 'rgba(0, 0, 0, 0.45) 0px 2px 10px',
                                            position: 'absolute',
                                            top: '9.5%',
                                            left: '34%',
                                            marginTop: '-1%',
                                        }
                                    }}
                                    contentLabel="Login Modal"
                                >
                                
                                {isSignUp ? (
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
                                            Welcome!
                                        </div>
                                        <div className="descriptionMessage">
                                            Sign up to share your next ride.
                                        </div>
                                        <div className="signInButtonContainer">
                                            <div onClick={handleGoogleSignUp} className="googleContainer">
                                                <img src={require("../../assets/google-logo.png")} alt="google logo" className="googleLogo"/>
                                                <div className="googleText">Google</div>
                                            </div>
                                        </div>
                                        <div className="divideContainer">
                                            <hr style={{width: '46.3%', marginTop: '2.2%', color: 'lightgrey'}}/>
                                            <div>or</div>
                                            <hr style={{width: '46.3%', marginTop: '2.2%', color: 'lightgrey'}}/>
                                        </div>
                                        <div>
                                            <div className="emailText">Email</div>
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="emailSignUpInput"
                                                />
                                            </div>
                                            <div className="passwordText">Password</div>
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                                <input
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="passwordSignUpInput"
                                                />
                                            </div>
                                            {"error" && <div className="error">{error}</div>}
                                            <button onClick={handleSignUp} className="signInButton">
                                                Sign Up
                                            </button>
                                            <div>
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '3%'}}>
                                                    <div className="createAccountText" onClick={handleToggleMode}>Back to Sign In</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
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
                                        <div className="signInButtonContainer">
                                            <div onClick={handleSignIn} className="googleContainer">
                                                <img src={require("../../assets/google-logo.png")} alt="google logo" className="googleLogo"/>
                                                <div className="googleText">Google</div>
                                            </div>
                                        </div>
                                        <div className="divideContainer">
                                            <hr style={{width: '46.3%', marginTop: '2.2%', color: 'lightgrey'}}/>
                                            <div>or</div>
                                            <hr style={{width: '46.3%', marginTop: '2.2%', color: 'lightgrey'}}/>
                                        </div>
                                        <div>
                                            <div className="emailText">Email</div>
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="emailSignUpInput"
                                                />
                                            </div>
                                            <div className="passwordText">Password</div>
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                                <input
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="passwordSignUpInput"
                                                />
                                            </div>
                                            {"error" && <div className="error">{error}</div>}
                                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '3.5%'}}>
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                                    <input 
                                                        type="checkbox"
                                                        className="checkbox"
                                                    />
                                                    <div className="rememberText">Remember for 30 days</div>
                                                </div>
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                                                    <div className="forgotPasswordText">Forgot Password</div>
                                                </div>
                                            </div>
                                            <button onClick={handleLogin} className="signInButton">
                                                Sign In
                                            </button>
                                            <div>
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '3%', gap: '1%'}}>
                                                    <div className="noAccountText">Don't have an account?</div>
                                                    <div className="createAccountText" onClick={handleToggleMode}>Create account</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
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