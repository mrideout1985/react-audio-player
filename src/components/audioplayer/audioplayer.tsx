import {
    Box,
    Button,
    Container,
    Grow,
    IconButton,
    Menu,
    MenuItem,
    Slider,
    Stack,
    Typography,
} from '@mui/material'
import React, { MutableRefObject, useEffect, useState, useRef } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import SettingsIcon from '@mui/icons-material/Settings'
import { PlayPauseButton } from './playPauseButton/playPauseButton'
import {
    Speaker,
    VolumeDownRounded,
    VolumeUpRounded,
} from '@mui/icons-material'

interface AudioPlayer {
    src: any
    transcription: string
}

function AudioPlayer({ src, transcription }: AudioPlayer) {
    const [playing, setPlaying] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [hover, setHover] = useState(false)
    const [mediaTime, setMediaTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [volume, setVolume] = useState<number>(0)
    const ref = useRef() as MutableRefObject<HTMLAudioElement>
    const open = Boolean(anchorEl)

    useEffect(() => {
        if (playing) {
            ref.current.play()
        } else {
            ref.current.pause()
        }
        onLoadedMetaData()
    }, [playing])

    const togglePLaying = (event: React.SyntheticEvent) => {
        setPlaying(!playing)
    }

    const onLoadedMetaData = () => {
        setDuration(ref.current.duration)
    }

    const onTimeUpdate = () => {
        setMediaTime(ref.current.currentTime)
    }

    const scrubberChange = (e: any) => {
        const playHead = parseFloat(e.target.value)
        setMediaTime(playHead)
        ref.current.currentTime = playHead
    }
    const volumeChange = (e: any) => {
        const parsedVolume = parseInt(e.target.value)
        const volumeHead = parsedVolume / 100
        setVolume(volumeHead)
        ref.current.volume = volumeHead
    }
    console.log(volume)

    const changeSpeed = (rate: number) => {
        ref.current.playbackRate = rate
    }

    const forwardFive = () => {
        const current = ref.current.currentTime
        const newTime = Math.max(current + 5)
        setMediaTime(newTime)
        ref.current.currentTime = newTime
    }

    const backFive = () => {
        const current = ref.current.currentTime
        const newTime = Math.min(current - 5)
        setMediaTime(newTime)
        ref.current.currentTime = newTime
    }

    const displaySongCounter = () => {
        return duration >= 18000
            ? new Date(mediaTime * 1000).toISOString().substring(11, 19)
            : new Date(mediaTime * 1000).toISOString().substring(14, 19)
    }

    const displaySongDuration = () => {
        // const timeCheck =
        //     duration >= 18000
        //         ? new Date(duration * 1000).toISOString().substring(11, 19)
        //         : new Date(duration * 1000).toISOString().substring(14, 19)
        return new Date(duration * 1000).toISOString().substring(14, 19)
    }

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            width="100%"
            height="100%"
            gap={'.5rem'}
        >
            {/* <SkipSecondsButton skipBack={backFive} skipForward={forwardFive} /> */}
            <PlayPauseButton playing={playing} togglePlaying={togglePLaying} />
            <VolumeUpIcon color="primary" />
            <Typography fontWeight={'900'}>{displaySongCounter()}</Typography>
            <Slider
                value={mediaTime ?? 0}
                min={0}
                max={duration}
                onChange={scrubberChange}
                sx={{ margin: '0 1rem' }}
            />
            {/* <Grow
                in={hover}
                style={{ transformOrigin: '0' }}
                {...(hover ? { timeout: 1000 } : {})}
            >
                <Stack height={'200px'}>
                    <Slider
                        aria-label="Volume"
                        min={0}
                        max={100}
                        size="small"
                        orientation="vertical"
                        defaultValue={30}
                        onChange={(e) => volumeChange(e)}
                    />
                </Stack>
            </Grow> */}
            <Typography fontWeight={'900'}>{displaySongDuration()}</Typography>

            <IconButton
                aria-label="settings"
                color={'primary'}
                size="small"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    setAnchorEl(event.currentTarget)
                }
            >
                <SettingsIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                open={open}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl as Element}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {[1, 1.25, 1.5, 1.75, 2].map((rate) => (
                    <MenuItem
                        key={rate}
                        onClick={() => changeSpeed(rate)}
                        dense={true}
                    >
                        {rate === 1 ? 'Normal' : rate}
                    </MenuItem>
                ))}
            </Menu>
            <audio
                style={{ display: 'none' }}
                onLoadedMetadata={onLoadedMetaData}
                onTimeUpdate={onTimeUpdate}
                ref={ref}
                controls
                src={src}
                onPlaying={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
            />
        </Box>
    )
}

export default AudioPlayer
