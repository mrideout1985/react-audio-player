import React from 'react'
import Replay5Icon from '@mui/icons-material/Replay5'
import { IconButton } from '@mui/material'

export interface RewindInterface {
    rewind: () => void
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

const Rewind = ({ rewind, color }: RewindInterface) => {
    return (
        <IconButton color={color} onClick={rewind}>
            <Replay5Icon />
        </IconButton>
    )
}

export { Rewind }
