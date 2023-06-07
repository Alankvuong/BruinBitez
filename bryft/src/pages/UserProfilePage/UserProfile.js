import "./UserProfile.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
// import tempPhoto from "../DriverProfilePage/alan_temp_photo.jpg"
import tempPhoto from "./blank-profile-image.webp";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import UserInfoPage from "../UserInfoPage/UserInfoPage";
import Modal from "react-modal";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

function UserProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [uid, setUID] = useState();

    useEffect(() => {
        getReviews();
        getUserProfileInfo();
    }, []);   

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }; 

    const getReviews = async() => {
        try {
            const auth = getAuth(); // Get the Firebase Auth instance
            const user = auth.currentUser; // Get the current user object
            console.log(user);
        
            if (user) {
              const riderUID = user.uid; // Get the UID of the current user
              const driverUID = '';
            
                const response = await axios.get(`http://localhost:8000/api/get-reviews?driverUID=${driverUID}&riderUID=${riderUID}`);
                const reviews = response.data;

                // Sort the reviews by date and time in descending order
                const sortedReviews = reviews.sort((a, b) => {
                    const dateA = a.data.reviewDate;
                    const timeA = a.data.reviewTime;
                    const dateB = b.data.reviewDate;
                    const timeB = b.data.reviewTime;
                
                    const dateTimeA = new Date(`${dateA} ${timeA}`);
                    const dateTimeB = new Date(`${dateB} ${timeB}`);
                
                    return dateTimeA - dateTimeB;
                });

                // Reverse the sorted array to display the reviews in descending order
                const descendingReviews = sortedReviews.reverse();
                
                console.log(descendingReviews);
                setReviews(descendingReviews);
            }
            
        } catch (error) {
            console.error("Error getting reviews: ", error);
        }
    }

    const getUserProfileInfo = async() => {

        try {
            const auth = await getAuth(); // Get the Firebase Auth instance
            onAuthStateChanged(auth, async(user) => {
                
                var userUID = '';
                if (user) {
                    userUID = user.uid; // Get the UID of the current user
                    setUID(userUID);
                } else { 
                    console.log("User is not logged in");
                }
                const response = await axios.get(`http://localhost:8000/api/get-user-profile?uid=${userUID}`);
                const userInfo = response.data;
                setUserInfo(userInfo);
            });
        } catch (err) {
            console.error("Error fetching user information.", err)
        }
    };

    return (
        <>
            <Navbar/>
            <div className="profile-page">
                <div className="user-container">
                    <img className="user-photo" src={ userInfo ? userInfo[0]?.data.selectedImage : tempPhoto} alt="driver" />
                    <h2 className="user-name">{ userInfo[0]?.data.firstName} { userInfo[0]?.data.lastName }</h2>
                    <h4 className="user-car">Model: { userInfo[0]?.data.car}</h4>
                    <p className="user-bio"><b>Bio:</b> { userInfo[0]?.data.bio}</p>
                    <button onClick={handleOpenModal}>Edit Profile</button>
                    {isModalOpen && <UserInfoPage
                        onClose={handleCloseModal} // Pass the close handler 
                        />
                    }
                </div>

                <div className="reviews">
                    <h3 className="reviews-heading">Reviews</h3>
                    {reviews.length > 0 ? (
                        reviews.map((review, i) => (
                        <Accordion className="reviews-accordion" key={i}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className="review-title"
                            >
                            <div className="user-rating">
                                {review.data.reviewRating.toFixed(1)}
                            </div>
                            <div className="review-title">{review.data.reviewTitle}</div>
                            <div className="date-time">
                                <div className="review-date">{review.data.reviewDate}</div>
                                <div className="date-time-separator">|</div>
                                <div className="review-time">
                                {review.data.reviewTime &&
                                    `${review.data.reviewTime.split(":")[0]}:${review.data.reviewTime.split(":")[1].padStart(
                                    2,
                                    "0"
                                    )} ${Number(review.data.reviewTime.split(":")[0]) < 12 ? "am" : "pm"}`}
                                </div>
                            </div>
                            </AccordionSummary>
                            <AccordionDetails className="review-expanded">
                            {review.data.reviewMessage}
                            </AccordionDetails>
                        </Accordion>
                        ))
                    ) : (
                        <Box mt={2}>
                        <Alert severity="info">No reviews available. Please check back later.</Alert>
                        </Box>
                    )}
                </div>
            </div>
        </>
    )
};

export default UserProfile;