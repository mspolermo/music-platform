import React from 'react';
import Navbar from "../components/Navbar";
import {Container} from "@material-ui/core";
import Head from "next/head";

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout = ({children}: MainLayoutProps) => {
    return (
        <>
            <Navbar/>
            <Container style={{margin: '90px 0'}}>
                {children}
            </Container>
        </>
    );
};

export default MainLayout;