import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { ITrack } from "../../types/track";
import TrackList from "../../components/TrackList";

const Index = () => {
    const router = useRouter();
    const tracks: ITrack[] = [
        {
            _id: "6683bf0363c09de4adf16ec4",
            name: "GOSPEL",
            artist: "EMINEN",
            text: "TEXT TEXT TEXT",
            listens: 2,
            picture: "http://localhost:5001/image/8f3d7458-04b8-4ec9-8bce-9600658dd4e1.jpg",
            audio: "http://localhost:5001/audio/e90c5fdc-57a5-4e9d-ba14-7c967871701e.mp3",
            comments: []
        },
        {
            _id: "6683bf0363c09de4adf16ec5",
            name: "qqw",
            artist: "EMINasdaEN",
            text: "Tasdasd",
            listens: 2,
            picture: "http://localhost:5001/image/8f3d7458-04b8-4ec9-8bce-9600658dd4e1.jpg",
            audio: "http://localhost:5001/audio/e90c5fdc-57a5-4e9d-ba14-7c967871701e.mp3",
            comments: []
        },
        {
            _id: "6683bf0363c09de4adf16e35",
            name: "Esdf",
            artist: "SAFASDA",
            text: "ADFA SD SADAS sdfsdf",
            listens: 2,
            picture: "http://localhost:5001/image/8f3d7458-04b8-4ec9-8bce-9600658dd4e1.jpg",
            audio: "http://localhost:5001/audio/e90c5fdc-57a5-4e9d-ba14-7c967871701e.mp3",
            comments: []
        }
    ]

    return (
        <MainLayout>
            <Grid container justifyContent={'center'}>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent={'space-between'}>
                            <h1>Список треков</h1>
                            <Button onClick={() => router.push('/tracks/create')}>
                                Загрузить
                            </Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks} />
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default Index;