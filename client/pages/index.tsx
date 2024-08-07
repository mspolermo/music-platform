import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";
import { useActions } from "../hooks/useActions";

const Index = () => {
    const { setActiveTrack } = useActions();

    useEffect(() => {
        setActiveTrack(null);
    }, [])
    return (
        <>
        <MainLayout>
            <div className="center">
                <h1>Добро пожаловать!</h1>
                <h3>Здесь собраны лучшие треки!</h3>
            </div>
        </MainLayout>
            <style jsx>
                {`
                    .center {
                        margin-top: 150px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                `}
            </style>
        </>
    )
}

export default Index;