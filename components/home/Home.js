import { useState, useRef } from "react";
import { Box, Grid, Typography, InputBase, Button } from "@mui/material";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

import Image from "next/image";
import classes from './Home.module.css';

const center = { lat: 28.53999198480272, lng: 77.16577169607818 };
const libs = ['places'];

const Home = ({ api_key }) => {

    const [directionResp, setDirectionResp] = useState(null);
    const [distance, setDistance] = useState('');
    const [eta, setEta] = useState('');

    const originRef = useRef();
    const destRef = useRef();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: api_key,
        libraries: libs
    });

    if (!isLoaded) return <div>Loading...</div>;

    const calculateDistance = async () => {
        if (originRef.current.value !== '' && destRef.current.value !== '') {

            console.log(originRef.current.value, destRef.current.value);

            const directionService = new google.maps.DirectionsService();

            const result = await directionService.route({
                origin: originRef.current.value,
                destination: destRef.current.value,
                travelMode: google.maps.TravelMode.DRIVING
            });

            setDirectionResp(result);
            setDistance(result.routes[0].legs[0].distance.text);
            setEta(result.routes[0].legs[0].duration.text);
        }
    }

    return (
        <Grid container className={classes.container} >

            <Grid item lg={6} md={6} sm={12} xs={12} >
                <Box className={classes.inputContainer}>

                    <Box>
                        <Box className={classes.inputWrapper} >
                            <Typography style={{ fontSize: 14, marginBottom: 5 }} >Origin</Typography>

                            <Box className={classes.inputBox} >
                                <Image src='/images/place.png' alt='location' height={27} width={24} />
                                <Autocomplete>
                                    <InputBase placeholder='Origin' inputRef={originRef} />
                                </Autocomplete>
                            </Box>
                        </Box>

                        <Box className={classes.inputWrapper} >
                            <Typography style={{ fontSize: 14, marginBottom: 5 }} >Destination</Typography>

                            <Box className={classes.inputBox} >
                                <Image src='/images/place.png' alt='location' height={27} width={24} />
                                <Autocomplete>
                                    <InputBase placeholder='Destination' inputRef={destRef} />
                                </Autocomplete>
                            </Box>
                        </Box>
                    </Box>

                    <Box className={classes.btnBox}>
                        <Button className={classes.calculate} variant="contained" onClick={calculateDistance}>Calculate</Button>
                    </Box>

                </Box>

                <Box className={classes.resBox}>
                    <Box className={classes.resVal}>
                        <Box style={{ fontSize: 20 }} >Distance</Box>
                        {
                            distance === '' ?
                                <Box className={classes.distVal} >--</Box> :
                                <Box className={classes.distVal} >{distance}</Box>
                        }
                    </Box>
                    <Box className={classes.resVal}>
                        <Box style={{ fontSize: 20 }} >Estimated Duration</Box>
                        {
                            eta === '' ?
                                <Box className={classes.distVal} >--</Box> :
                                <Box className={classes.distVal} >{eta}</Box>
                        }

                    </Box>
                    {
                        originRef.current && destRef.current ?
                            <Box className={classes.resText}>
                                The distance between <b>{originRef.current.value}</b> and <b>{destRef.current.value}</b> is <b>{distance}</b>.
                            </Box> :
                            <Box className={classes.resText}>
                                The distance between <b> -- </b> and <b> -- </b> is <b> -- </b>.
                            </Box>
                    }
                </Box>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} >
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '40vw', height: '70vh' }}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false
                    }}
                >
                    <Marker position={center} />
                    {directionResp && <DirectionsRenderer directions={directionResp} />}
                </GoogleMap>
            </Grid>

        </Grid>
    );
};

export default Home;