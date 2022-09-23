import { Grid } from "@mui/material";

import InputComponent from "./InputComponent";
import MapComponent from "./MapComponent";
import classes from './Home.module.css';


const Home = () => {
    return (
        <Grid container className={classes.container} >
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <InputComponent />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} >
                <MapComponent />
            </Grid>
        </Grid>
    );
};

export default Home;