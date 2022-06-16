import React from 'react'
import Forward5Icon from '@mui/icons-material/Forward5'
import { IconButton } from '@mui/material'

export interface SkipInterface {
    skip: () => void
    color?:
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

const Skip = ({ skip, color }: SkipInterface) => {
    return (
        <IconButton color={color} onClick={skip}>
            <Forward5Icon />
        </IconButton>
    )
}

export { Skip }
