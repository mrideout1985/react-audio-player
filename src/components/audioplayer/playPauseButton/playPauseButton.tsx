import React, { SyntheticEvent } from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'
import { IconButton } from '@mui/material'

interface PlayPauseButtonInterface {
    playing: boolean
    togglePlaying: (e: SyntheticEvent) => void
    color:
        | 'inherit'
        | 'default'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning'
        | undefined
}

const PlayPauseButton = ({
    playing,
    togglePlaying,
    color,
}: PlayPauseButtonInterface) => {
    return (
        <IconButton
            aria-label={playing ? 'pause' : 'playing'}
            color={color}
            onClick={togglePlaying}
        >
            {playing ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
        </IconButton>
    )
}

export { PlayPauseButton }
