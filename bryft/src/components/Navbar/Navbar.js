import React, { useState } from "react";
import Modal from 'react-modal';
import ModalComponent from '../../components/ModalComponent'
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
            window.location.reload(false);

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
                                <ModalComponent 
                                    isOpen={modalIsOpen}
                                    closeModal={closeModal}
                                    isSignUp={isSignUp}
                                    handleToggleMode={handleToggleMode}
                                    handleSignUp={handleSignUp}
                                    handleSignIn={handleSignIn}
                                    handleLogin={handleLogin}
                                    handleGoogleSignUp={handleGoogleSignUp}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    error={error}
                                />

                            </div>
                        </div>
                    )}
                    </li>
                </ul>
        </nav>
    )
}

export default Navbar;