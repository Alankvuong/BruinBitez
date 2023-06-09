import Navbar from "../../components/Navbar/Navbar";
import '@fontsource/amiko';
import './RidesPage.css'
import { Typography, Box, Container, RadioGroup, FormControlLabel, Radio, Checkbox } from "@mui/material";
import React, { useState, useEffect } from 'react';
import RideModal from "../../components/RideModal/RideModal";
import RidePost from "../../components/RidePost/RidePost";
import axios from "axios";

export default function RidesPage() {
    const [fetchedRides, setFetchedRides] = useState([]);
    const [queryParams, setQueryParams] = useState({});
    const [selectedValues, setSelectedValues] = useState({
        origin: '',
        destination: '',
        dateTime: ''
    });

    useEffect(() => {
        console.log(queryParams);
        axios.get('http://localhost:8000/api/get-rides', { params: queryParams })
            .then((response) => {
                // Sort rides from closest date to farthest date
                const sortRides = response.data.sort((a, b) => {
                    const dateTimeA = new Date(a.dateTime);
                    const dateTimeB = new Date(b.dateTime);
                    return dateTimeA - dateTimeB;
                });

                setFetchedRides(sortRides);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [queryParams]);

    const handleQueryParamChange = (e) => {

        if (selectedValues[e.target.name] === e.target.value) {
            //deselect previous or currently selected checkbox
            setQueryParams({ ...queryParams, [e.target.name]: '' });
            setSelectedValues({ ...selectedValues, [e.target.name]: '' });
        } else {
            //select new checkbox
            setQueryParams({ ...queryParams, [e.target.name]: e.target.value });
            setSelectedValues({ ...selectedValues, [e.target.name]: e.target.value });
        }
    }

    return (
        <div>
            <Navbar />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" m={1} >
                <Typography variant="h5" className="title-text">
                    Where are you traveling to?
                </Typography>
                <Box display="flex" marginLeft="auto" mb={2} >
                    <RideModal />
                </Box>
                <Box display="flex" flexDirection="row" width="100%">
                    <Container className="filter-container">

                        <span className="filter-category">Origin</span>
                        <FormControlLabel control={<Checkbox checked={selectedValues.origin === 'UCLA'} onChange={handleQueryParamChange} />} label="UCLA" value="UCLA" className="filter" name="origin" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.origin === 'LAX'} onChange={handleQueryParamChange} />} label="LAX" value="LAX" className="filter" name="origin" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.origin === 'USC'} onChange={handleQueryParamChange} />} label="USC" value="USC" className="filter" name="origin" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.origin === 'San Diego'} onChange={handleQueryParamChange} />} label="San Diego" value="San Diego" className="filter" name="origin" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.origin === 'Koreatown'} onChange={handleQueryParamChange} />} label="Koreatown" value="Koreatown" className="filter" name="origin" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.origin === 'Irvine'} onChange={handleQueryParamChange} />} label="Irvine" value="Irvine" className="filter" name="origin" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.origin === 'Orange County'} onChange={handleQueryParamChange} />} label="Orange County" value="Orange County" className="filter" name="origin" />

                        <span className="filter-category">Destination</span>
                        <FormControlLabel control={<Checkbox checked={selectedValues.destination === 'UCLA'} onChange={handleQueryParamChange} />} label="UCLA" value="UCLA" className="filter" name="destination" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.destination === 'LAX'} onChange={handleQueryParamChange} />} label="LAX" value="LAX" className="filter" name="destination" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.destination === 'USC'} onChange={handleQueryParamChange} />} label="USC" value="USC" className="filter" name="destination" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.destination === 'San Diego'} onChange={handleQueryParamChange} />} label="San Diego" value="San Diego" className="filter" name="destination" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.destination === 'Koreatown'} onChange={handleQueryParamChange} />} label="Koreatown" value="Koreatown" className="filter" name="destination" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.destination === 'Irvine'} onChange={handleQueryParamChange} />} label="Irvine" value="Irvine" className="filter" name="destination" />
                        <FormControlLabel control={<Checkbox checked={selectedValues.destination === 'Orange County'} onChange={handleQueryParamChange} />} label="Orange County" value="Orange County" className="filter" name="destination" />
                    </Container>
                    <Container className="rides-container">
                        {fetchedRides.map((item, index) => (
                            <RidePost key={index}
                                origin={item.origin}
                                destination={item.destination}
                                driver={item.driver}
                                dateTime={item.displayDateTime}
                                price={item.price}
                                driverUid={item.driverUid}
                                numSpots={item.numSpots}
                                docId={item.docId}
                                riderUids={item.riderUids}
                            />
                        ))}
                    </Container>
                </Box>
            </Box>
        </div>
    )
}
