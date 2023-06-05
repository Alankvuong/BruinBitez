import "./HomePage.css";
import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import backdrop from './backdrop-royce.png';
import icon1 from './icon-computer.png';
import icon2 from './icon-students.png';
import icon3 from './icon-money.png';
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <React.Fragment>
            <main>
            <Navbar />
            <img className="backdrop" src={backdrop} alt="Backdrop" />
                <h1>BETTER TRANSPORT FOR BRUINS.</h1>
                
            <div className="quickcontainer">
                <Link to="/rides"><div className="textbox color1">Create a group</div></Link>
                <Link to="/rides"><div className="textbox color2">Find a ride</div></Link>
            </div>
            
            <div className="infocontainer">
            
                <div className="infobox">
                    <img className="icon" src={icon1} alt="icon1" />
                    <h2>Easy to use</h2>
                    <p>Browse existing ridesharing groups or create your own for an easy commute to and from UCLA</p>
                </div>
                <div className="divider"></div>    
                <div className="infobox">
                    <img className="icon" src={icon2} alt="icon2" />
                    <h2>Ride with fellow Bruins</h2>
                    <p>Groups are exclusively available to current UCLA students, eliminating the uncertainty of carpooling with complete strangers</p>
                </div>
                <div className="divider"></div>
                <div className="infobox">
                    <img className="icon" src={icon3} alt="icon3" />
                    <h2>Save money</h2>
                    <p>Cut down on expensive rides by splitting the fare among several people</p>
                </div>
            </div>
            </main>
        </React.Fragment>
    )
}
export default HomePage;
