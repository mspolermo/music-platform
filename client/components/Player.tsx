import { Grid, IconButton } from "@material-ui/core";
import { Pause, PlayArrow, VolumeUp } from "@material-ui/icons";
import React, { useEffect } from "react";
import styles from '../styles/Player.module.scss'
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

let audio;

const Player = () => {
    const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player);
    const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration } = useActions();

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        }
        else {
            setAudio();
            playTrack();
            audio.play();
        }
        if (!active) {
            audio.pause();
        }
    }, [active])

    useEffect(() => {
        if (audio.duration) {
            setDuration(Math.ceil(audio.duration))
            setCurrentTime(Math.ceil(audio.currentTime))
        }

        if(pause) {
            audio.pause();
        } else {
            audio.play();
        }
    }, [pause])

    const setAudio = () => {
        if (active) {
            audio.src = 'http://localhost:5001/' + active.audio;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    };

    const play = () => {
        if (pause) {
            playTrack();
            audio.play();
        } else {
            pauseTrack();
            audio.pause();
        }
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value))
    };

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value))
    };

    if (!active) {
        return null;
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {!pause
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration}  onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}} />
            <TrackProgress left={volume} right={100}  onChange={changeVolume} volume={true}/>
        </div>
    )
}

export default Player;