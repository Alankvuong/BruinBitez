import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import "./ReviewModal.css";
import { getAuth } from "firebase/auth";

function ReviewModal({ isOpen: isOpenProp, onClose }) {
    const [isOpen, setIsOpen] = useState(isOpenProp);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewMessage, setReviewMessage] = useState("");
    const [reviewRating, setReviewRating] = useState(0);
    const [showThankYouModal, setShowThankYouModal] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        onClose(); // Call the onClose function provided by the parent component
        window.location.reload(false);
    }

    const handleCloseNoRefresh = () => {
        setIsOpen(false);
        onClose();
    }

    const handleSubmit = async() => {
        const currentDate = new Date();
        let currentDay = String(currentDate.getDate()).padStart(2, '0');
        let currentMonth = String(currentDate.getMonth()+1).padStart(2, "0");
        let currentYear = currentDate.getFullYear();

        const hours = currentDate.getHours(); // 0-23
        const minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes(); // 0-59
        const seconds = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds(); ; // 0-59

        // display the date as MM/DD/YYYY
        const reviewDate = `${currentMonth}/${currentDay}/${currentYear}`;

        // minutes.replace(minutes, minutes.toString().padStart(2, '0'));
        const reviewTime = `${hours}:${minutes}:${seconds}`

        console.log(reviewTime);
        // console.log(`Current time: ${hours}:${minutes}:${seconds}`);

        const decimalRating = Number(reviewRating.toFixed(1));          // converts review display to decimal format
        
        const urlParams = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        const driverUID = urlParams.uid;
        console.log("Driver UID: ", driverUID);

        try {
            const auth = getAuth(); // Get the Firebase Auth instance
            const user = auth.currentUser; // Get the current user object
        
            if (user) {
              const riderUID = user.uid; // Get the UID of the current user

                try {
                    // sends the necessary review data to firebase through backend api
                    const response = await axios.post("http://localhost:8000/api/add-review", {
                        reviewDate,
                        reviewTime,
                        reviewTitle,
                        reviewMessage,
                        reviewRating: decimalRating,
                        riderUID,
                        driverUID
                    });
                    
                    setShowThankYouModal(true);
                } catch(err) {
                    console.error(err);
                }
            }
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
                        <IconButton className="close-icon" edge="end" color="inherit" onClick={handleCloseNoRefresh}>
                            <CloseIcon />
                        </IconButton>
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
