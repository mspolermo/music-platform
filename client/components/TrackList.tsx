import React from "react";
import { ITrack } from "../types/track";
import { Box, Grid } from "@material-ui/core";
import TrackItem from "./TrackItem";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface TrackListProps {
    tracks: ITrack[]
}

const TrackList = ({tracks}: TrackListProps) => {
    const { active, currentTime, duration } = useTypedSelector(state => state.player);
    return (
        <Grid container direction={'column'}>
            <Box p={2}>
                {tracks.map(track =>
                    <TrackItem
                        key={track._id}
                        track={track}
                        active={active == track}
                        currentTime={currentTime}
                        duration={duration}
                    />
                )}
            </Box>
        </Grid>
    )
}

export default TrackList;