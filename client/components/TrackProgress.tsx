import React from 'react';
import useTimeFormat from '../hooks/useTimeFormat';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e) => void;
    volume? : boolean
}

const TrackProgress = ({ left, right, onChange, volume = false }: TrackProgressProps) => {
        return (
            <div style={{display: 'flex'}}>
                <input
                    type="range"
                    min={0}
                    max={right}
                    value={left}
                    onChange={onChange}
                />
                {(volume)
                    ? <div>{Math.ceil(left)} / {Math.ceil(right)}</div>
                    : <div>{useTimeFormat(left)} / {useTimeFormat(right)}</div>
                }
            </div>
        );
    };

export default TrackProgress;