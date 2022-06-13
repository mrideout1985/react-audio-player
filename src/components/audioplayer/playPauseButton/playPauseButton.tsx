import React, { SyntheticEvent } from 'react'
import { IconButton } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'

interface PlayPauseButtonInterface {
    playing: boolean
    togglePlaying: (e: SyntheticEvent) => void
}

const PlayPauseButton = ({
    playing,
    togglePlaying,
}: PlayPauseButtonInterface) => {
    return (
        <IconButton
            aria-label={playing ? 'pause' : 'playing'}
            color={'primary'}
            onClick={togglePlaying}
        >
            {playing ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
        </IconButton>
    )
}

export { PlayPauseButton }
