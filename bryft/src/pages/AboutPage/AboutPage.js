import "./AboutPage.css";
import Navbar from "../../components/Navbar/Navbar";
import IconButton from "@mui/material/IconButton";
import Email from "@mui/icons-material/Email";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import { Link } from 'react-router-dom';

import alan from '/Users/sophialee/Desktop/for git/Bryft/bryft/src/components/alanheadshot.jpeg';
import kenny from '/Users/sophialee/Desktop/for git/Bryft/bryft/src/components/kennyheadshot.jpg';
import kevin from '/Users/sophialee/Desktop/for git/Bryft/bryft/src/components/kevinheadshot.jpeg';
import mikey from '/Users/sophialee/Desktop/for git/Bryft/bryft/src/components/mikeyheadshot.jpeg';
import sophia from '/Users/sophialee/Desktop/for git/Bryft/bryft/src/components/sophiaheadshot.jpg';


function AboutPage() {
    return (
        <div>
        <Navbar />
        <div className="brick" style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h1 className="title">about us</h1>
                <div className='flex-row'>
                    <img src ={alan} style={{ width: '20%', maxWidth: '200px', margin: '0 10px' }}/>
                    <div style={{ width: '15px' }}></div> {/* spacing */}
                    <img src ={kenny} style={{ width: '20%', maxWidth: '200px', margin: '0 10px' }}/>
                    <div style={{ width: '15px' }}></div> {/* spacing */}
                    <img src ={kevin} style={{ width: '20%', maxWidth: '200px', margin: '0 10px' }}/>
                    <div style={{ width: '15px' }}></div> {/* spacing */}
                    <img src ={mikey} style={{ width: '20%', maxWidth: '200px', margin: '0 10px' }}/>
                    <div style={{ width: '15px' }}></div> {/* spacing */}
                    <img src ={sophia} style={{ width: '20%', maxWidth: '200px', margin: '0 10px' }}/>
                </div>
                <br/>
                <p className="text">Welcome to Bryft, a rideshare platform exclusively designed by college students, for college students. We understand the challenges of commuting to and from campus, and our mission is to provide a safe, convenient, and reliable solution tailored specifically to meet the needs of today's students. Whether you’re a driver searching for some travel buddies and some extra cash, or a rider looking to connect with fellow students and hitch a cheap ride, Bryft is the perfect platform for you. 
                <br/>
                <br/>
                At Bryft, we strive to create a community where students can easily connect with fellow classmates, find affordable rides, and forge meaningful connections along the way. Join Bryft today and revolutionize the way you travel to and from campus. Together, let's navigate the roads of education, connection, and opportunity.</p>
            </div>
            <div className="brick">
                <h2 className="subtitle">
                    connect with us
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
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
