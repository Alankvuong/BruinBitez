import Navbar from "../../components/Navbar/Navbar";
import '@fontsource/amiko';
import './RidesPage.css'
import { Typography, Box, Container, RadioGroup, FormControlLabel, Radio, Checkbox } from "@mui/material";
import React, { useState, useEffect } from 'react';
import RideModal from "../../components/RideModal/RideModal";
import RidePost from "../../components/RidePost/RidePost";
import axios from "axios";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MovingCar from "../../assets/cartoon-car.svg";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme({
    typography: {
        h6: {
            fontSize: "20px"
        },
        fontFamily: [
            'Amiko',
        ].join(','),
    },
  });

export default function RidesPage() {
    const [fetchedRides, setFetchedRides] = useState([]);
    const [queryParams, setQueryParams] = useState({});
    const [selectedValues, setSelectedValues] = useState({
        origin: '',
        destination: '',
        dateTime: ''
    });
    const [sortType, setSortType] = useState("date-descending");
    const [sortedRides, setSortedRides] = useState();
    const [isSortedByDateAscending, setIsSortedByDateAscending] = useState(true);

    useEffect(() => {
        console.log(queryParams);
        axios.get('http://localhost:8000/api/get-rides', { params: queryParams })
            .then((response) => {
                setFetchedRides(response);
                // Sort rides from closest date to farthest date
                const sortedRides = response.data.sort((a, b) => {
                    const dateTimeA = new Date(a.dateTime);
                    const dateTimeB = new Date(b.dateTime);
                    return dateTimeA - dateTimeB;
                });

                if(!isSortedByDateAscending) {
                    sortedRides.reverse();
                }
                
                if(sortType === "date-ascending") {
                    setSortedRides([...sortedRides].reverse());
                    console.log("ascending");
                } else if(sortType === "date-descending") {
                    // ridesToSort.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
                    setSortedRides([...sortedRides]);
                    setIsSortedByDateAscending(false);
                    console.log("descending");
                    // console.log(ridesToSort);
                } else if(sortType === "price-ascending") {
                    setSortedRides([...sortedRides.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))]);
                } else if(sortType === "price-descending") {
                    setSortedRides([...sortedRides.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))]);
                }                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [sortType, isSortedByDateAscending, queryParams]);

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

    const handleSelectOptionsChange = (event) => {
        const selectedSortType = event.target.value;
        setSortType(selectedSortType);

        console.log(sortedRides);
    }

    return (
        <div>
            <Navbar />
            <span className="rides-page-header">
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" className="title-text">
                        Where are you traveling?
                    </Typography>
                </ThemeProvider>
                <img className="moving-car" src={MovingCar} alt="moving car" width="140" height="140" draggable="false"></img>
            </span>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" m={1} >
                {/* Ride Post Button */}
                <Box display="flex" marginLeft="auto" mb={2}>
                    <RideModal />
                </Box>

                <span className="sort-by-select">
                    <FormControl className="sort-by-list" component="div">
                        <InputLabel id="simple-select-label">Sort</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={sortType}
                            label="sort"
                            onChange={handleSelectOptionsChange}
                        >
                            <MenuItem value="date-ascending">Date - Ascending</MenuItem>
                            <MenuItem value="date-descending">Date - Descending</MenuItem>
                            <MenuItem value="price-ascending">Price - Ascending</MenuItem>
                            <MenuItem value="price-descending">Price - Descending</MenuItem>
                        </Select>
                    </FormControl>
                </span>
                <Box display="flex" flexDirection="row" width="100%" className="box-container">
                    <Container className="filter-container">
                        <ThemeProvider theme={theme}>
                            <Typography variant="h6" className="filter-heading-text">Filter your destinations</Typography>
                        </ThemeProvider>
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
                    <Container className="rides-container" max-width="80%" width="100%">
                        {sortedRides && sortedRides.map((ride, index) => (
                            <RidePost
                                ridesObject={ride}
                                key={index}                            
                            />
                        ))}
                    </Container>
                </Box>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" className="end-of-results-text">
                    End of Results
                    </Typography>
                </ThemeProvider>
            </Box>
        </div>
    )
}
