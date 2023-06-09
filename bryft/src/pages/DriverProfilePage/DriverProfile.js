import "./DriverProfile.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
// import tempPhoto from "../DriverProfilePage/alan_temp_photo.jpg"
import tempPhoto from "../DriverProfilePage/blank-profile-image.webp";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { AccordionActions } from "@mui/material";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ReviewModal from "../../components/ReviewsModal/ReviewsModal";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function DriverProfile() {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [userRating, setUserRating] = useState();

    const profileUrl = "http://localhost:3000/rider-profile?uid=";

    useEffect(() => {
        getReviews();
        getUserProfileInfo();
    }, []);    
    
    const handleShowReviewModal = () => {
        setShowReviewModal(true);
    }

    const getReviews = async() => {
        try {
            const urlParams = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });
    
            const driverUID = urlParams.uid;
            const response = await axios.get(`http://localhost:8000/api/get-reviews?driverUID=${driverUID}`);
            const reviews = response.data;

            console.log(reviews);
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
    }

    const getUserProfileInfo = async() => {

        const urlParams = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        const uid = urlParams.uid;
        try {            
            const response = await axios.get(`http://localhost:8000/api/get-user-profile?uid=${uid}`);
            const userInfo = response.data;
            setUserInfo(userInfo);
        } catch (err) {
            console.error("Error fetching user information.", err)
        }
    };

    return (
        <>
            <Navbar/>
            <div className="driver-profile-page">
                <div className="driver-container">
                    <img className="driver-photo" src={ userInfo ? userInfo[0]?.data.selectedImage : tempPhoto} alt="driver" />
                    <div className="name-rating">
                        <h2 className="user-name">{ userInfo[0]?.data.firstName} { userInfo[0]?.data.lastName }</h2>
                            <StarBorderOutlinedIcon className="review-star-icon"/> 
                        <p className="avg-user-rating">
                            {userRating}
                        </p>
                    </div>
                    <h4 className="driver-car">Model: { userInfo[0]?.data.car}</h4>
                    <p className="driver-bio"><b>Bio:</b> { userInfo[0]?.data.bio}</p>
                </div>

                <div className="driver-reviews-container">
                    <div className="reviews-heading-container">
                        <h3 className="reviews-heading">Reviews They've Received</h3>
                    </div>
                    <div className="review-button-section">
                        <Button className="add-review-btn" variant="outlined" onClick={handleShowReviewModal}>+ Add Review</Button>
                        {showReviewModal && <ReviewModal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} />}
                    </div>
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
                            <AccordionActions>
                                <div className="rider-info">
                                    <a href={profileUrl + review.data.riderUID} className="rider-link">View Rider</a>
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
        </>
    )
}

export default DriverProfile;