import { useState, useRef } from "react";
import { Box, Grid, Typography, InputBase, Button, styled } from "@mui/material";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

import Image from "next/image";

const InputContainer = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 25px;
`;

const InputBox = styled(Box)`
    align-items: center;
    padding: 5px;
    display: flex;
    border: 1px solid #c4c2c2;
    border-radius: 4px;
    background-color: #FFFFFF;
`;

const InputSearchBase = styled(InputBase)`
    margin-left: 6px;
    color: #4D6475;
    font-size: 20px;
    font-weight: 600;
`;

const StyledButton = styled(Button)`
    margin-top: 10px;
    width: 141px;
    height: 62px;
    text-transform: none;
    font-weight: 600;
    border-radius: 32px;
    color: #FFFFFF;
    background: #1B31A8;
`;

const ResultBox = styled(Box)`
    border: 1px solid #c4c2c2;
    border-radius: 8px;
`;

const ResVal = styled(Box)`
    display: flex;
    background-color: #FFFFFF;
    padding: 20px;
`;

const DistVal = styled(Box)`
    margin-left: auto;
    font-size: 30px;
    font-weight: 600;
    color: #0079FF;
`;

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
        <Grid container style={{ marginTop: 33, alignItems: 'center' }} >

            <Grid item lg={6} md={6} sm={12} xs={12} style={{ padding: '20px 50px' }} >
                <InputContainer>

                    <Box>
                        <Box style={{ padding: '20px 15px' }} >
                            <Typography style={{ fontSize: 14, marginBottom: 5 }} >Origin</Typography>

                            <InputBox >
                                <Image src='/images/place.png' alt='location' height={27} width={24} />
                                <Autocomplete>
                                    <InputSearchBase placeholder='Origin' inputRef={originRef} />
                                </Autocomplete>
                            </InputBox>
                        </Box>

                        <Box style={{ padding: '20px 15px' }} >
                            <Typography style={{ fontSize: 14, marginBottom: 5 }} >Destination</Typography>

                            <InputBox >
                                <Image src='/images/place.png' alt='location' height={27} width={24} />
                                <Autocomplete>
                                    <InputSearchBase placeholder='Destination' inputRef={destRef} />
                                </Autocomplete>
                            </InputBox>
                        </Box>
                    </Box>

                    <Box style={{ padding: 10, textAlign: 'right' }}>
                        <StyledButton variant="contained" onClick={calculateDistance}>Calculate</StyledButton>
                    </Box>

                </InputContainer>

                <ResultBox>
                    <ResVal>
                        <Box style={{ fontSize: 20 }} >Distance</Box>
                        {
                            distance === '' ?
                                <DistVal>--</DistVal> :
                                <DistVal>{distance}</DistVal>
                        }
                    </ResVal>
                    <ResVal>
                        <Box style={{ fontSize: 20 }} >Estimated Duration</Box>
                        {
                            eta === '' ?
                                <DistVal>--</DistVal> :
                                <DistVal>{eta}</DistVal>
                        }

                    </ResVal>
                    {
                        originRef.current && destRef.current ?
                            <Box style={{padding: '35px 10px'}} >
                                The distance between <b>{originRef.current.value}</b> and <b>{destRef.current.value}</b> is <b>{distance}</b>.
                            </Box> :
                            <Box style={{padding: '35px 10px'}} >
                                The distance between <b> -- </b> and <b> -- </b> is <b> -- </b>.
                            </Box>
                    }
                </ResultBox>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} style={{ padding: '20px 50px' }} >
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