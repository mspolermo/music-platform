import React, { useEffect, useState } from 'react';
import {ITrack} from "../types/track";
import {Card, Grid, IconButton} from "@material-ui/core";
import styles from '../styles/TrackItem.module.scss'
import {Delete, Pause, PlayArrow} from "@material-ui/icons";
import {useRouter} from "next/router";
import { useActions } from '../hooks/useActions';
import axios from 'axios';
import { useTypedSelector } from '../hooks/useTypedSelector';
import useTimeFormat from '../hooks/useTimeFormat';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
    currentTime: number;
    duration: number;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false, currentTime, duration}) => {
    const router = useRouter();
    const { playTrack, pauseTrack, setActiveTrack } = useActions();
    const [isPlayed, setIsPlayed] = useState(false);

    useEffect(() => {
        if (!active) {
            setIsPlayed(false)
        }
    }, [active])

    const playFunc = (e) => {
        e.stopPropagation();
        setIsPlayed(true);
        setActiveTrack(track);
        playTrack();
    }

    const pauseFunc = (e) => {
        e.stopPropagation();
        setIsPlayed(false)
        pauseTrack();
    }

    const deleteTrack = async (e) => {
        e.stopPropagation()
        await axios.delete('http://localhost:5001/tracks/' + track._id)
            .then(response => router.push('/tracks'))
            .catch(error => console.log(error))
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={!isPlayed ? playFunc : pauseFunc}>
                {(isPlayed && active)
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5001/' + track.picture}/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>{useTimeFormat(currentTime)}/ {useTimeFormat(duration)}</div>}
            <IconButton onClick={deleteTrack} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;