import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import Grid from '@mui/material/Grid';

//should take in props that contain from and to locations, min price, driver name, and departure time
export default function RidePost() {
    return (
        <Card>
            <CardContent>
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item direction="column">
                        <Typography variant="h5">
                            LAX --- UCLA
                        </Typography>
                        <Typography variant="body">
                            kdfdsf
                        </Typography>
                    </Grid>
                    <Grid item direction="column">
                        <Typography variant="h5">
                            Driver: John Doe
                        </Typography>
                        <Typography variant="body">
                            Departure Time: 12:00pm
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    );
}