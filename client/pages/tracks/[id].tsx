import React, {useState} from 'react';
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {Button, Grid, TextField} from "@material-ui/core";
import { useRouter } from 'next/router';

const TrackPage = ({serverTrack}) => {
    const track: ITrack = 
    {
        _id: "6683bf0363c09de4adf16ec4",
        name: "GOSPEL",
        artist: "EMINEN",
        text: "TEXT TEXT TEXT",
        listens: 2,
        picture: "http://localhost:5001/image/8f3d7458-04b8-4ec9-8bce-9600658dd4e1.jpg",
        audio: "http://localhost:5001/audio/e90c5fdc-57a5-4e9d-ba14-7c967871701e.mp3",
        comments: []
    }
    const router = useRouter()

    return (
        <MainLayout
        >
            <Button
                onClick={() => router.push('/tracks')}
                variant={"outlined"}
                style={{fontSize: 32}}
            >
                К списку
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={track.picture} width={200} height={200}/>
                <div style={{marginLeft: 30}}>
                    <h1>Название трека - {track.name}</h1>
                    <h1>Исполнитель - {track.artist}</h1>
                    <h1>Прослушиваний - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Слова в треке</h1>
            <p>{track.text}</p>
            <h1>Комментарии</h1>
            <Grid container>

                <TextField
                    label="Ваше имя"
                    fullWidth
                />
                <TextField
                    label="Комментарий"
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button>Отправить</Button>
            </Grid>
            <div>
                {track.comments.map((comment, index) =>
                    <div key={comment.username + comment.text + index}>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарий - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;
