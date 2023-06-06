import Navbar from "../../components/Navbar/Navbar";
import '@fontsource/amiko';
import './RidesPage.css'
import { Typography, Box, Container } from "@mui/material";
import React, { useState } from 'react';
import RideEditor from "../../components/RideEditor/RideEditor";
import axios from "axios";

export default function RidesPage() {
    const [showForm, setShowForm] = useState(false);
    const [rideData, setRideData] = useState({
        origin: '',
        destination: '',
        driver: '',
        departureTime: '',
        price: '',
      });

    const handleClick = () => {
        setShowForm(true);
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

        setShowForm(false);
    }

    return (
        <div>
            <Navbar />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" m="20px">
                <Typography variant="h6" className="title-text">
                    Where are you traveling to?
                </Typography>
                <Box display="flex" marginLeft="auto">
                    <button onClick={handleClick} className="ride-button">Create Ride Post</button>
                </Box>
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <label>
                            Origin:
                            <input type="text" name="origin" value={rideData.origin} onChange={handleChange}/>
                        </label>
                        <label>
                            Destination:
                            <input type="text" name="destination" value={rideData.destination} onChange={handleChange}/>
                        </label>
                        <label>
                            Driver:
                            <input type="text" name="driver" value={rideData.driver} onChange={handleChange}/>
                        </label>
                        <label>
                            Departure Time:
                            <input type="text" name="departureTime" value={rideData.departureTime} onChange={handleChange}/>
                        </label>
                        <label>
                            Price:
                            <input type="text" name="price" value={rideData.price} onChange={handleChange}/>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Box>
        </div>
    )
}
