import Navbar from "../../components/Navbar/Navbar";
import '@fontsource/amiko';
import './RidesPage.css'
import { Typography, Box, Container } from "@mui/material";
import React, { useState, useEffect } from 'react';
import RideModal from "../../components/RideModal/RideModal";
import RidePost from "../../components/RidePost/RidePost";
import axios from "axios";

export default function RidesPage() {
    const [fetchedRides, setFetchedRides] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/get-rides')
            .then((response) => {
                setFetchedRides(response.data);
                console.log("fetched rides", response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, []);

    return (
        <div>
            <Navbar />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" m={1} >
                <Typography variant="h5" className="title-text">
                    Where are you traveling to?
                </Typography>
                <Box display="flex" marginLeft="auto" mb={2}>
                    <RideModal />
                </Box>
                <Container>
                    {fetchedRides.map((item, index) => (
                            <RidePost key={index}
                                origin={item.origin}
                                destination={item.destination}
                                driver={item.driver}
                                departureTime={item.departureTime}
                                price={item.price}
                                uid={item.uid}
                                numSpots={item.numSpots}
                                docId={item.docId}
                            />
                    ))}
                </Container>
            </Box>
        </div>
    )
}
