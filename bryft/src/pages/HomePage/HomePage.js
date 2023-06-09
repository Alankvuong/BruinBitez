import "./HomePage.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import backdrop from './backdrop-royce.png';
import icon1 from './icon-computer.png';
import icon2 from './icon-students.png';
import icon3 from './icon-money.png';
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function SignedIn() {
    return (
        <div className="logincontainer">
            <div className="logintext2">
                    New to Bryft? <Link to="/sign-up-info" className="signuplink">
                    Sign up!
                </Link>
            </div>
            <div className="logintext">
                Already have an account? Click here to sign in:
            </div>
            <Link to="/rides">
                <div className="loginbutton">Sign in</div>
            </Link>
        </div>
    );
}

function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkUserLogin();
    }, []);

    const checkUserLogin = async () => {
        const auth = getAuth(); // Get the Firebase Auth instance
        onAuthStateChanged(auth, (user) => {
            console.log("User", user);
            if (user) {
                console.log(user);
                setIsLoggedIn(true);
            }
        });
    }

    return (
        <React.Fragment>
            <main>
                <Navbar />
                <div className="bodycontainer">
                    {/* <div className="backdrop"></div> */}
                    <img className="backdrop" src={backdrop} alt="Backdrop" />
                    <h1 className="h1-headings">BETTER TRANSPORT FOR BRUINS.</h1>

                    <div className="quickcontainer">
                        <Link to="/rides">
                            <div className="textbox color1">Create a group</div>
                        </Link>
                        <Link to="/rides">
                            <div className="textbox color2">Find a ride</div>
                        </Link>
                    </div>

                    {!isLoggedIn && (
                        <div className="logincontainer">
                            {/* Render the login container */}
                            <SignedIn />
                        </div>
                    )}

                    <div className="backing">
                        <div className="infocontainer">
                            <div className="infobox">
                                <img className="icon" src={icon1} alt="icon1" />
                                <h2 className="h2-headings">Easy to use</h2>
                                <p className="p-tags">
                                    Browse existing ridesharing groups or create your own for an easy commute to and
                                    from UCLA
                                </p>
                            </div>
                            <div className="divider"></div>
                            <div className="infobox">
                                <img className="icon" src={icon2} alt="icon2" />
                                <h2 className="h2-headings">Ride with fellow Bruins</h2>
                                <p className="p-tags">
                                    Groups are exclusively available to current UCLA students, eliminating the
                                    uncertainty of carpooling with complete strangers
                                </p>
                            </div>
                            <div className="divider"></div>
                            <div className="infobox">
                                <img className="icon" src={icon3} alt="icon3" />
                                <h2 className="h2-headings">Save money</h2>
                                <p className="p-tags">
                                    Cut down on expensive rides by splitting the fare among several people!
                                </p>
                            </div>
                        </div>
                        <div className="additionalinfocontainer">
                            <div className="additionalinfo"></div>
                            <div className="additionalinfotext">Get back to the place you call home.</div>
                        </div>
                        <div className="bottom">
                            <div className="logo">
                                <Link to="/">BRYFT</Link>
                            </div>
                            <div className="bottomtext">
                                TM &amp; Copyright 2023 Bryft.
                                All Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default HomePage;
