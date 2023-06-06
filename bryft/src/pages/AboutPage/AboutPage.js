import "./AboutPage.css";
import Navbar from "../../components/Navbar/Navbar";
import IconButton from "@mui/material/IconButton";
import Email from "@mui/icons-material/Email";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import { Link } from 'react-router-dom';

import alan from '../../components/alanheadshot.jpeg';
import kenny from '../../components/kennyheadshot.jpg';
import kevin from '../../components/kevinheadshot.jpeg';
import mikey from '../../components/mikeyheadshot.jpeg';
import sophia from '../../components/sophiaheadshot.jpg';


function AboutPage() {
    return (
        <div>
        <Navbar />
        <div className="maindiv">
                <h1 className="title">about us</h1>
                <div className="headshot-container">
                    <img src={alan} className="headshot" alt="Alan's headshot" />
                    <div className="spacer"></div>
                    <img src={kenny} className="headshot" alt="Kenny's headshot" />
                    <div className="spacer"></div>
                    <img src={kevin} className="headshot" alt="Kevin's headshot" />
                    <div className="spacer"></div>
                    <img src={mikey} className="headshot" alt="Mikey's headshot" />
                    <div className="spacer"></div>
                    <img src={sophia} className="headshot" alt="Sophia's headshot" />
                </div>

                <br/>
                <p className="text">Welcome to Bryft, a rideshare platform exclusively designed by college students, for college students. We understand the challenges of commuting to and from campus, and our mission is to provide a safe, convenient, and reliable solution tailored specifically to meet the needs of today's students. Whether you’re a driver searching for some travel buddies and some extra cash, or a rider looking to connect with fellow students and hitch a cheap ride, Bryft is the perfect platform for you. 
                <br/>
                <br/>
                At Bryft, we strive to create a community where students can easily connect with fellow classmates, find affordable rides, and forge meaningful connections along the way. Join Bryft today and revolutionize the way you travel to and from campus. Together, let's navigate the roads of education, connection, and opportunity.</p>
                <h2 className="subtitle">
                    connect with us
                </h2>
                <div className="icons">
                    <IconButton button component={Link} to="mailto:bryftucla@gmail.com">
                        <Email fontSize = "large"/>
                    </IconButton>
                    <IconButton button component={Link} to="https://www.instagram.com">
                        <Instagram fontSize = "large"/>
                    </IconButton>
                    <IconButton button component={Link} to="https://www.linkedin.com">
                        <LinkedIn fontSize = "large"/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
export default AboutPage;
