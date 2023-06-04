import "./HomePage.css";
import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import backdrop from './royce-backdrop.png';
import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <React.Fragment>
            <Navbar />
            <img className="backdrop" src={backdrop} alt="Backdrop" />
            <h1>BETTER TRANSPORT FOR BRUINS.</h1>
            <Link to="/rides"><div className="textbox t1">Create a group</div></Link>
            <Link to="/rides"><div className="textbox t2">Find a ride</div></Link>
            <div className="backing"></div>
            <img className="icon i1" src={icon1} alt="icon1" />
            
            <div className="divider d1"></div>
            <img className="icon i2" src={icon2} alt="icon2" />
            <div className="divider d2"></div>
            <img className="icon i3" src={icon3} alt="icon3" />

            <h2 className="sh1">Easy to use</h2>
            <h2 className="sh2">Ride with fellow Bruins</h2>
            <h2 className="sh3">Save money</h2>
            <p style={{ left: "5%" }}>Browse existing ridesharing groups or create your own for an easy commute to and from UCLA</p>
            <p style={{ left: "37%" }}>Groups are exclusively available to current UCLA students, eliminating the uncertainty of carpooling with complete strangers</p>
            <p style={{ left: "70%" }}>Cut down on expensive rides by splitting the fare among several people</p>
        </React.Fragment>
    )
}
export default HomePage;
