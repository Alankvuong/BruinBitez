import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import "./RidePost.css";
import { auth } from "../../firebase";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

export default function RidePost({ origin, destination, driver, price, departureTime, uid, docId, numSpots }) {
    const driverProfileUrl = "http://localhost:3000/driver-profile?uid=" + uid;

    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [joinedRide, setJoinedRide] = useState(false);
    const [userEqualsDriver, setUserEqualsDriver] = useState(false);
    const [spots, setSpots] = useState(numSpots);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isMounted) {
            axios.post('http://localhost:8000/api/change-spots', { numSpots: spots, docId: docId })
                .then((response) => {
                    console.log("numspots changed");
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            onAuthStateChanged(auth, (currentUser) => {
                setIsLoggedIn(!!currentUser);
                if (uid === currentUser?.uid) {
                    setUserEqualsDriver(true);
                }
            });
            setIsMounted(true);
        }
    }, [spots, isMounted]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!joinedRide) {
            setSpots(spots - 1);
            setJoinedRide(true);
        } else {
            setSpots(spots + 1);
            setJoinedRide(false);
        }

        axios.post('http://localhost:8000/api/change-spots', { numSpots: spots, docId: docId })
            .then((response) => {
                console.log('Response:', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        //setJoinedRide(true);
        handleClose();
        //window.location.reload();
    }

    return (
        <div>
            <Card className="ride-card" onClick={handleOpen}>
                <CardContent className='ride-card-content'>
                    <Grid container className='grid-container'>
                        <Grid item className="top-left">
                            {origin} --&gt; {destination}
                        </Grid>
                        <Grid item className="top-right">
                            <a href={driverProfileUrl} className="driver-link">
                                Driver: {driver}
                            </a>
                        </Grid>
                        <Grid item className="bottom-left">
                            <span className='text-container'> Price: {price} </span>
                            {spots > 0 ? <span className='text-container'> Spots Left: {spots} </span> : <span className='text-container error-message'> This ride is full! </span>}
                        </Grid>
                        <Grid item className="bottom-right">
                            Departure Time: {departureTime}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
            <Dialog open={open} onClose={handleClose}>
                {!isLoggedIn && <div className="error-message">You need to be logged in to join a ride!</div>}
                {userEqualsDriver && <div className="error-message">You are already the driver!</div>}
                {/* {joinedRide && <div className="error-message">You already joined this ride!</div>} */}
                {!joinedRide ? <DialogTitle>Do you want to join this ride?</DialogTitle> : <DialogTitle>Do you want to leave this ride?</DialogTitle>}
                {/* <DialogContent>
                    Number of Available Spots: {spots}
                </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {!joinedRide ? <Button onClick={handleSubmit} color="primary" variant="contained" disabled={!isLoggedIn || userEqualsDriver || spots <= 0}>
                       Join Ride
                    </Button> : <Button onClick={handleSubmit} color="primary" variant="contained" disabled={!isLoggedIn || userEqualsDriver}>
                       Leave Ride
                    </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}