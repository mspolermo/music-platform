import React, {useState} from 'react';
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {Button, Grid, TextField} from "@material-ui/core";
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput('');
    const text = useInput('');

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5001/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]});
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <MainLayout
            title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist}
            keywords={'Музыка, артисты, '  + track.name + ' - ' + track.artist}
        >
            <Button
                onClick={() => router.push('/tracks')}
                variant={"outlined"}
                style={{fontSize: 20}}
            >
                К списку
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5001/' + track.picture} width={200} height={200}/>
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
                    {...username}
                    label="Ваше имя"
                    fullWidth
                    style={{marginBottom: 10}}
                />
                <TextField
                    {...text}
                    label="Комментарий"
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Отправить</Button>
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

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5001/tracks/' + params.id);
    return {
        props : {
            serverTrack: response.data
        }
    }
}
