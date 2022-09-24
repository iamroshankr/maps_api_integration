import { Box } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// import Image from "next/image";

const center = { lat: 28.53999198480272, lng: 77.16577169607818 };

const MapComponent = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.MAPS_API_KEY
    });

    if(!isLoaded) return <div>Loading...</div>

    return (
        <Box>
            {/* <Image src='/images/card.png' alt='mapImage' height={511} width={560} /> */}
            <GoogleMap center={center} zoom={12} mapContainerStyle={{width: '100%', height: '100%'}}>

            </GoogleMap>
        </Box>
    );
};

export default MapComponent;