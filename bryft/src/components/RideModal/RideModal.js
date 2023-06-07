import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import "./RideModal.css";
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function RideModal() {
  const [open, setOpen] = useState(false);
  const [rideData, setRideData] = useState({
    origin: '',
    destination: '',
    driver: '',
    departureTime: '',
    price: '',
    uid: ''
  });

  //tracks if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser);
      if (currentUser.uid) {
        setRideData({ ...rideData, driver: currentUser.displayName, uid: currentUser.uid });
      } else {
        console.log("currentUser is null");
      }
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setRideData({ ...rideData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(rideData);
    console.log("form submitted");
    axios.post('http://localhost:8000/api/create-ride', rideData)
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    handleClose();
    window.location.reload();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Ride Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
      {!isLoggedIn && <div className="error-message">You need to be logged in to create a ride post!</div>}
        <DialogTitle>Ride Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField label="Where will you be leaving from?" name="origin" value={rideData.origin} onChange={handleChange} margin="normal" fullWidth />
            <TextField label="Where will you be heading?" name="destination" value={rideData.destination} onChange={handleChange} margin="normal" fullWidth />
            <TextField label="Price" name="price" value={rideData.price} onChange={handleChange} margin="normal" />
            <TextField label="Departure Time" name="departureTime" value={rideData.departureTime} onChange={handleChange} margin="normal" fullWidth />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" disabled={!isLoggedIn}>
            Create Ride
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
