import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

// ridesObject: Contains information about the ride for an individiual ride post
//      Includes: origin, destination, driver, price, dateTime, driverUid, docId, numSpots, riderUids
export default function RidePost({ ridesObject }) {
    require("./RidePost.css");
    const driverProfileUrl = "http://localhost:3000/driver-profile?uid=" + ridesObject?.driverUid;
    const riderProfileUrl = "http://localhost:3000/rider-profile?uid=";
    const [riders, setRiders] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [joinedRide, setJoinedRide] = useState(false);
    const [userEqualsDriver, setUserEqualsDriver] = useState(false);
    const [spots, setSpots] = useState(ridesObject.numSpots);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isMounted) {
            axios.post('http://localhost:8000/api/change-spots', { numSpots: spots, docId: ridesObject.docId })
                .then((response) => {
                    console.log("numspots changed");
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            onAuthStateChanged(auth, (currentUser) => {
                setIsLoggedIn(!!currentUser);
                if (ridesObject?.driverUid === currentUser?.uid) {
                    setUserEqualsDriver(true);
                }
            });
            setIsMounted(true);
        }
    }, [spots, isMounted, riders]);

    const handleOpen = () => {

        if (auth.currentUser?.uid) {
            if (ridesObject.riderUids.includes(auth.currentUser.uid)) {
                setJoinedRide(true);
                console.log("joined", joinedRide);
            }
        }

        setOpen(true);
        console.log(ridesObject.riderUids);
        axios.get('http://localhost:8000/api/get-names', { params: { uids: ridesObject.riderUids } })
            .then((response) => {
                console.log("rider names", response.data);
                setRiders(response.data.names);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    }
    
    const handleCancel = () => {
        setOpen(false);
    }

    const changeSpots = () => {
        if (!joinedRide) {
            setSpots(spots - 1);
            setJoinedRide(true);
        } else {
            setSpots(spots + 1);
            setJoinedRide(false);
        }

        axios.post('http://localhost:8000/api/change-spots', { numSpots: spots, docId: ridesObject.docId })
            .then((response) => {
                console.log('Response:', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleJoin = (event) => {
        event.preventDefault();

        changeSpots();

        if (auth.currentUser?.uid) {
            axios.post('http://localhost:8000/api/join-ride', { uid: auth.currentUser.uid, docId: ridesObject.docId })
                .then((response) => {
                    console.log('Response:', response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        handleClose();
    }

    const handleLeave = (event) => {
        event.preventDefault();

        changeSpots();

        if (auth.currentUser?.uid) {
            axios.post('http://localhost:8000/api/leave-ride', { uid: auth.currentUser.uid, docId: ridesObject.docId })
                .then((response) => {
                    console.log('Response:', response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        handleClose();

    }

    return (
        <div>

            <Card className="ride-card" onClick={handleOpen}>
                <CardContent className='ride-card-content'>
                    <Grid container className='grid-container'>
                        <Grid item className="top-left ride-titles">
                            {ridesObject.origin} <ArrowRightAltIcon style={{ color: '#439EFF', fontSize: '2rem' }}/> {ridesObject.destination}
                        </Grid>
                        <Grid item className="top-right">
                            <a href={driverProfileUrl} className="driver-link">
                                Driver: {ridesObject.driver}
                            </a>
                        </Grid>
                        <Grid item className="bottom-left">
                            <span className='text-container'> Price: ${ridesObject.price} </span>
                            {spots > 0 ? <span className='text-container'> Spots Left: {spots} </span> : <span className='text-container error-message'> This ride is full! </span>}
                        </Grid>
                        <Grid item className="bottom-right departure-time">
                            <div className="departure-time-text">
                                Departing: 
                            </div> 
                            {ridesObject.displayDateTime}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card >
            <Dialog className="ride-details-modal" open={open} onClose={handleClose}>
                <DialogTitle>Ride Details: </DialogTitle>
                <DialogContent >
                    <div className="name-container">
                        <a href={ridesObject.driverProfileUrl} className="driver-link">
                            Driver: {ridesObject.driver}
                        </a>
                    </div>
                    <div className="name-container">
                        Riders:
                        {riders.map((item, index) => (
                            <a href={riderProfileUrl + ridesObject.riderUids[index]} key={index} className="driver-link">{item}</a>
                        ))}
                    </div>

                </DialogContent>
                {!isLoggedIn && <div className="error-message">You need to be logged in to join a ride!</div>}
                {userEqualsDriver && <div className="error-message">You are the driver!</div>}
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    {!joinedRide ? <Button onClick={handleJoin} color="primary" variant="contained" disabled={!isLoggedIn || userEqualsDriver || spots <= 0}>
                        Join Ride
                    </Button> : <Button onClick={handleLeave} color="primary" variant="contained" disabled={!isLoggedIn || userEqualsDriver}>
                        Leave Ride
                    </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}