import { Box } from "@mui/material";
import Image from "next/image";

const MapComponent = () => {
    return (
        <Box>
            <Image src='/images/card.png' alt='mapImage' height={511} width={560} />
        </Box>
    );
};

export default MapComponent;