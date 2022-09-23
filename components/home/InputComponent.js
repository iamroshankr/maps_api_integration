import { Box, Typography, InputBase, Button } from "@mui/material";
import Image from "next/image";

import classes from './InputComponent.module.css';

const InputComponent = () => {
    return (
        <Box>
            <Box className={classes.container}>

                <Box>
                    <Box className={classes.inputWrapper} >
                        <Typography style={{ fontSize: 14, marginBottom: 5 }} >Origin</Typography>

                        <Box className={classes.inputBox} >
                            <Image src='/images/place.png' alt='location' height={27} width={24} />
                            <InputBase placeholder='Origin' />
                        </Box>
                    </Box>

                    <Box className={classes.inputWrapper} >
                        <Typography style={{ fontSize: 14, marginBottom: 5 }} >Destination</Typography>

                        <Box className={classes.inputBox} >
                            <Image src='/images/place.png' alt='location' height={27} width={24} />
                            <InputBase placeholder='Destination' />
                        </Box>
                    </Box>
                </Box>

                <Box className={classes.btnBox}>
                    <Button className={classes.calculate} variant="contained">Calculate</Button>
                </Box>

            </Box>

            <Box>
                <Box className={classes.resVal}>
                    <Box style={{ fontSize: 20 }} >Distance</Box>
                    <Box className={classes.distVal} >1,427 kms</Box>
                </Box>
                <Box className={classes.resText}>
                    The distance between <b>Mumbai</b> and <b>Delhi</b> is <b>1,427 kms</b>.
                </Box>
            </Box>
        </Box>

    );
};

export default InputComponent;