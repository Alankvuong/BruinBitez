import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import "./ReviewModal.css";

function ReviewModal({ isOpen: isOpenProp, onClose }) {
    const [isOpen, setIsOpen] = useState(isOpenProp);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");
    const [reviewRating, setReviewRating] = useState(0);
    const [showThankYouModal, setShowThankYouModal] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        onClose(); // Call the onClose function provided by the parent component
    }

    const handleSubmit = async() => {
        const currentDate = new Date();
        let currentDay = String(currentDate.getDate()).padStart(2, '0');
        let currentMonth = String(currentDate.getMonth()+1).padStart(2, "0");
        let currentYear = currentDate.getFullYear();

        // display the date as MM/DD/YYYY
        const reviewDate = `${currentMonth}/${currentDay}/${currentYear}`;

        const decimalRating = Number(reviewRating.toFixed(1));          // converts review display to decimal format
        
        try {
            // sends the necessary review data to firebase through backend api
            const response = await axios.post("http://localhost:8000/api/add-review", {
                reviewDate,
                reviewTitle,
                reviewMessage,
                reviewRating: decimalRating
            });
            
            setShowThankYouModal(true);
        } catch(err) {
            console.error(err);
        }
    }

    const handleThankYouModalClose = () => {
        setShowThankYouModal(false);
        handleClose();
    }

    return (
        <>
            <Modal open={isOpen} onClose={handleClose}>
                <div className="modal">
                    <div className="modal-content">
                        <Typography variant="h4" component="h4" color="#439EFF">
                            Add a review
                        </Typography>
                        <TextField
                            label="Review Title"
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Review Message"
                            value={reviewMessage}
                            onChange={(e) => setReviewMessage(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Rating
                            name="rating"
                            value={reviewRating}
                            onChange={(e, newRating) => setReviewRating(parseFloat(newRating.toFixed(1)))}
                            size="large"
                        />
                        <br></br>
                        <Button variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Thank you modal to show confirmation when adding reviews */}
            <Modal open={showThankYouModal} onClose={handleThankYouModalClose}>
                <div className="thank-you-modal">
                    <div className="thank-you-content">
                        <Typography variant="h4" component="h4">
                            Thank you for your review!
                        </Typography>
                        <Typography variant="body1" component="p">
                            Your review has been submitted successfully.
                        </Typography>
                        <Button variant="contained" onClick={handleThankYouModalClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ReviewModal;
