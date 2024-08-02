import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import backdrop from './backdrop-royce.png';
import ComputerIcon from '@mui/icons-material/Computer';
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GroupOfPeople from "../../assets/group-of-people.svg";
import Money from "../../assets/money.svg"
import JansSteps from "./janns.jpeg";

function SignedIn() {
    require("./HomePage.css");
    return (
        <div className="login-container">
            <div className="login-banner-text">
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
        <>
            <main>
                <Navbar />
                <div className="body-container">
                    {/* <div className="backdrop"></div> */}
                    <img className="backdrop" src={backdrop} alt="Backdrop" />
                    <h1 className="h1-headings">BETTER TRANSPORT FOR BRUINS.</h1>

                    <div className="cta-buttons-container">
                        <Link className="cta-links" to="/rides">
                            <div className="create-a-group-btn button">Create a group</div>
                        </Link>
                        <Link className="cta-links" to="/rides">
                            <div className="find-a-ride-btn button">Find a ride</div>
                        </Link>
                    </div>

                    {!isLoggedIn && (
                        <div className="logincontainer">
                            {/* Render the login container */}
                            <SignedIn />
                        </div>
                    )}

                    <div className="backing">
                        <div className="info-container">
                            <div className="info-box">
                                {/* <img className="icon" src={icon1} alt="icon1" /> */}
                                <ComputerIcon className="computer-icon"/>
                                <h2 className="h2-headings">Easy to use</h2>
                                <p className="icon-subtext">
                                    Browse existing ridesharing groups or create your own for an easy commute to and
                                    from UCLA
                                </p>
                            </div>
                            <div className="divider"></div>
                            <div className="info-box">
                                <img className="group-of-people icon" src={GroupOfPeople} alt="group of people" />
                                <h2 className="h2-headings">Ride with fellow Bruins</h2>
                                <p className="icon-subtext">
                                    Groups are exclusively available to current UCLA students, eliminating the
                                    uncertainty of carpooling with complete strangers
                                </p>
                            </div>
                            <div className="divider"></div>
                            <div className="info-box">
                                <img className="money icon" src={Money} alt="money" />
                                <h2 className="h2-headings">Save money</h2>
                                <p className="icon-subtext">
                                    Cut down on expensive rides by splitting the fare among several people!
                                </p>
                            </div>
                            <div className="divider"></div>
                        </div>
                        <div className="additional-info-container">
                            {/* <div className="additional-info"></div> */}
                            <img className="additional-info-img" src={JansSteps} alt="jans steps"></img>
                            <div className="additional-info-text">Get back to the place you call home.</div>
                        </div>
                        <div className="bottom">
                            <div className="logo">
                                <Link to="/">BRYFT</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default HomePage;
