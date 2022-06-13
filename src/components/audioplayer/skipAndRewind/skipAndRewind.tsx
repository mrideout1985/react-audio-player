import React from 'react'
import { Box, Button } from '@mui/material'

interface SkipSecondsButtonsInterface {
    skipBack: () => void
    skipForward: () => void
}

const SkipSecondsButton = ({
    skipBack,
    skipForward,
}: SkipSecondsButtonsInterface) => {
    return (
        <Box component="div">
            <Button onClick={skipForward}>+5</Button>
            <Button onClick={skipBack}>-5</Button>
        </Box>
    )
}

export { SkipSecondsButton }
