import React from 'react'
import { IconButton } from '@mui/material'
import Forward5Icon from '@mui/icons-material/Forward5'

export interface SkipInterface {
    skip: () => void
}

const Skip = ({ skip }: SkipInterface) => {
    return (
        <IconButton color="primary" onClick={skip}>
            <Forward5Icon />
        </IconButton>
    )
}

export { Skip }
