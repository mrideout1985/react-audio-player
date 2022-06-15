import React from 'react'
import { IconButton } from '@mui/material'
import Replay5Icon from '@mui/icons-material/Replay5'

export interface RewindInterface {
    rewind: () => void
}

const Rewind = ({ rewind }: RewindInterface) => {
    return (
        <IconButton color="primary" onClick={rewind}>
            <Replay5Icon />
        </IconButton>
    )
}

export { Rewind }
