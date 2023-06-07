import "./DriverProfile.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
// import tempPhoto from "../DriverProfilePage/alan_temp_photo.jpg"
import tempPhoto from "../DriverProfilePage/blank-profile-image.webp";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ReviewModal from "../../components/ReviewsModal/ReviewsModal";
import axios from "axios";

function DriverProfile() {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviews();
    }, []);    
    
    const handleShowReviewModal = () => {
        setShowReviewModal(true);
    }

    const getReviews = async() => {
        try {
            const response = await axios.get("http://localhost:8000/api/get-reviews");
            setReviews(response.data);
            
        } catch (error) {
            console.error("Error getting reviews: ", error);
        }
    }

    return (
        <>
            <Navbar/>
            <div className="driver-profile-page">
                <div className="driver-container">
                    <img className="driver-photo" src={tempPhoto} alt="driver" />
                    <h2 className="driver-name">John Doe</h2>
                    <h4 className="driver-car">Model: Honda Accord</h4>
                    <p className="driver-bio">Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh mauris cursus mattis molestie. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Arcu felis bibendum ut tristique et.</p>
                </div>

                <div className="reviews">
                    <h3 className="reviews-heading">Reviews</h3>
                    <div className="review-button-section">
                        <Button className="add-review-btn" variant="outlined" onClick={handleShowReviewModal}>+ Add Review</Button>
                        {showReviewModal && <ReviewModal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} />}
                    </div>
                    {reviews.map((reviews, i) => (
                        <Accordion className="reviews-accordion" key={i}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className="review-title"
                            >
                                <div className="driver-rating">{reviews.data.reviewRating.toFixed(1)}</div>
                                <div className="review-title">
                                    {reviews.data.reviewTitle}
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className="review-expanded">
                            {reviews.data.reviewMessage}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DriverProfile;