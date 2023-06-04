import Navbar from "../../components/Navbar/Navbar";
import '@fontsource/amiko';
import './RidesPage.css'
import { Typography, Box, Container } from "@mui/material";
import React, { useState } from 'react';
import RideEditor from "../../components/RideEditor/RideEditor";

export default function RidesPage() {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        //create firebase collection thingy
        setShowForm(false);
    }

    return (
        <div>
            <Navbar />
            <div>

            </div>
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
                            Name:
                            <input type="text" name="name" />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Box>
        </div>
    )
}
