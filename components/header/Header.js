import { AppBar, Toolbar } from "@mui/material";
import Image from "next/image";

import classes from './Header.module.css';

const Header = () => {

    return (
        <AppBar className={classes.styledHeader}>
            <Toolbar style={{ minHeight: 80 }}>
                <Image className="logo" src="/images/graviti_logo.png" alt="logo" width={160} height={69} />
            </Toolbar>
        </AppBar>
    );

};

export default Header;