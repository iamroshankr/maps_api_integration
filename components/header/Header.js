import { AppBar, Toolbar, styled } from "@mui/material";
import Image from "next/image";

const StyledHeader = styled(AppBar)`
    background: #FFFFFF;
    height: 80px;
`;

const Header = () => {

    return (
        <StyledHeader>
            <Toolbar style={{ minHeight: 80 }}>
                <Image src="/images/graviti_logo.png" alt="logo" width={160} height={69} />
            </Toolbar>
        </StyledHeader>
    );

};

export default Header;