import "./UserProfile.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
// import tempPhoto from "../DriverProfilePage/alan_temp_photo.jpg"
import tempPhoto from "./blank-profile-image.webp";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { AccordionActions } from "@mui/material";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import UserInfoPage from "../UserInfoPage/UserInfoPage";
import Modal from "react-modal";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function UserProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [riderReviews, setRiderReviews] = useState([]);
    const [driverReviews, setDriverReviews] = useState([]);
    const [userRating, setUserRating] = useState();
    const [userInfo, setUserInfo] = useState([]);
    const [uid, setUID] = useState('');
  
    const driverProfileUrl = "http://localhost:3000/driver-profile?uid=";
  
    useEffect(() => {
      const auth = getAuth(); // Get the Firebase Auth instance
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const riderUID = user.uid; // Get the UID of the current user
          setUID(riderUID);
          getReviews(riderUID);
          getUserProfileInfo(riderUID);
        }
      });
    }, []);
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const getReviews = async (riderUID) => {

        let uid = riderUID;
        // Getting rider reviews (reviews you've given)
        try {
            const driverUID = 0;
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
    
            setRiderReviews(descendingReviews);
            console.log(descendingReviews);

            let ratingArray = [];
            reviews.forEach(review => {
              ratingArray.push(review.data.reviewRating);
            });
            
            let sum = ratingArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            let avgUserRating = (sum / ratingArray.length).toFixed(2);


            setUserRating(avgUserRating);
        } catch (error) {
            console.error("Error getting reviews: ", error);
        }

        // Getting driver reviews (reviews you've given)
        try {
            const driverUID = uid;
            const riderUID = 0;
            const response = await axios.get(`http://localhost:8000/api/get-reviews?driverUID=${driverUID}&riderUID=${riderUID}`);
            const reviews = response.data;
            console.log(reviews)
    
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
    
            setDriverReviews(descendingReviews);
            console.log("Descending reviews:", descendingReviews);
        } catch (error) {
            console.error("Error getting reviews: ", error);
        }

    };
  
    const getUserProfileInfo = async (riderUID) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-user-profile?uid=${riderUID}`);
        const userInfo = response.data;
        setUserInfo(userInfo);
      } catch (err) {
        console.error("Error fetching user information.", err)
      }
    };

    return (
        <>
            <Navbar/>
            <div className="profile-page">
                <div className="user-container">
                    <img className="user-photo" src={ userInfo && userInfo !== undefined? userInfo[0]?.data.selectedImage : tempPhoto} alt="driver" />
                    <div className="name-rating">
                        <h2 className="user-name">{ userInfo[0]?.data.firstName} { userInfo[0]?.data.lastName }</h2>
                            <StarBorderOutlinedIcon className="review-star-icon"/> 
                        <p className="avg-user-rating">
                            {userRating}
                        </p>
                    </div>
                    <h4 className="user-car">Model: { userInfo[0]?.data.car}</h4>
                    <p className="user-bio"><b>Bio:</b> { userInfo[0]?.data.bio}</p>
                    <button onClick={handleOpenModal}>Edit Profile</button>
                    {isModalOpen && <UserInfoPage onClose={handleCloseModal} userInfo={userInfo} />}
                </div>

                <div className="encompassing-reviews-container">

                    <div className="user-reviews-container">
                        <div className="reviews-heading-container">
                            <h3 className="reviews-heading">Reviews You've Wrote!</h3>
                        </div>
                        {riderReviews.length > 0 ? (
                            riderReviews.map((review, i) => (
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
                                <AccordionActions>
                                    <div className="driver-info">
                                        <a href={driverProfileUrl + review.data.driverUID} className="driver-link">View Driver</a>
                                    </div>
                                </AccordionActions>
                            </Accordion>
                            ))
                        ) : (
                            <Box className="no-reviews-container" mt={2}>
                                <Alert className="no-reviews-message"severity="info">This user currently has no reviews. Check back later for an update!</Alert>
                            </Box>
                        )}
                    </div>

                    <div className="user-reviews-container">
                        <div className="reviews-heading-container">
                            <h3 className="reviews-heading">Reviews You've Received!</h3>
                        </div>
                        {driverReviews.length > 0 ? (
                            driverReviews.map((review, i) => (
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
                                <AccordionActions>
                                    <div className="driver-info">
                                        <a href={driverProfileUrl + review.data.riderUID} className="driver-link">View Rider</a>
                                    </div>
                                </AccordionActions>
                            </Accordion>
                            ))
                        ) : (
                            <Box className="no-reviews-container" mt={2}>
                                <Alert className="no-reviews-message"severity="info">This user currently has no reviews. Check back later for an update!</Alert>
                            </Box>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserProfile;