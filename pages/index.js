import Head from "next/head";
import { Box, styled } from "@mui/material";

import Header from "../components/header/Header";
import Home from "../components/home/Home";

const TextItem = styled(Box)`
    margin-top: 113px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;
    color: #1B31A8;
`;

const Main = () => {
    return (
        <>

            <Head>
                <meta name="graviti" description="We are Mumbai based SaaS start-up developing vertically intergrated solutions for Indian B2B logistics market." />
            </Head>

            <Header />

            <TextItem>
                Let's calculate <strong>distance</strong> from Google maps
            </TextItem>

            <Home />

        </>
    );
};

export default Main;