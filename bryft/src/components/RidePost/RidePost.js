import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import React from 'react';
import "./RidePost.css";
import { auth } from "../../firebase";

export default function RidePost({ origin, destination, driver, price, departureTime, uid }) {
    const url = "http://localhost:3000/driver-profile?uid=" + uid;
    return (
        <Card className="ride-card">
            <CardContent className='ride-card-content'>
                <Grid container className='grid-container'>
                    <Grid item className="top-left">
                        {origin} --&gt; {destination}
                    </Grid>
                    <Grid item className="top-right">
                        <a href={url} className="driver-link">
                            Driver: {driver}
                        </a>
                    </Grid>
                    <Grid item className="bottom-left">
                        Price: {price}
                    </Grid>
                    <Grid item className="bottom-right">
                        Departure Time: {departureTime}
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    );
}