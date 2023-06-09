import Navbar from "../../components/Navbar/Navbar";
import '@fontsource/amiko';
import './RidesPage.css'
import { Typography, Box, Container, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import RideModal from "../../components/RideModal/RideModal";
import RidePost from "../../components/RidePost/RidePost";
import axios from "axios";

export default function RidesPage() {
    const [fetchedRides, setFetchedRides] = useState([]);
    const [queryParams, setQueryParams] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/get-rides', { params: queryParams })
            .then((response) => {
                setFetchedRides(response.data);
                console.log("fetched rides", response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [queryParams]);

    const handleQueryParamChange = (e) => {
        setQueryParams({...queryParams, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <Navbar />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" m={1} >
                <Typography variant="h5" className="title-text">
                    Where are you traveling to?
                </Typography>
                <Box display="flex" flexDirection="row" justifyContent="space-between" mb={2} width="100%">
                <Box>
                    <TextField 
                        label="From"
                        name="origin"
                        size="small"
                        value={queryParams.origin || ''}
                        onChange={handleQueryParamChange} 
                    />
                    <TextField 
                        label="To"
                        name="destination"
                        size="small"
                        value={queryParams.destination || ''}
                        onChange={handleQueryParamChange} 
                    />
                    </Box>
                    <RideModal />
                </Box>
                <Container>
                    {fetchedRides.map((item, index) => (
                        <RidePost key={index}
                            origin={item.origin}
                            destination={item.destination}
                            driver={item.driver}
                            dateTime={item.dateTime}
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
