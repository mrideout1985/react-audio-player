import { IconButton, Menu, MenuItem, Slider, Typography } from '@mui/material'
import React, { MutableRefObject, useEffect, useState, useRef } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import SettingsIcon from '@mui/icons-material/Settings'
import { PlayPauseButton } from './playPauseButton/playPauseButton'
import styles from './audioplayer.module.scss'
import {
    Speaker,
    VolumeDownRounded,
    VolumeUpRounded,
} from '@mui/icons-material'
import { Rewind } from './rewind/rewind'
import { Skip } from './skip/skip'

interface AudioPlayer {
    src: any
    color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

function AudioPlayer({ src, color }: AudioPlayer) {
    const [playing, setPlaying] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [mediaTime, setMediaTime] = useState<number>(0)
    const [volume, setVolume] = useState<number>(0.5)
    const [duration, setDuration] = useState<number>(0)
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

    const togglePLaying = (event: any) => {
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
        const parsedVolume = parseInt(e.target.value) / 100
        ref.current.volume = parsedVolume
        setVolume(ref.current.volume)
        ref.current.muted = false
    }

    const handleMute = () => {
        if (ref.current.muted) {
            ref.current.muted = false
            setVolume(ref.current.volume)
        } else {
            ref.current.muted = true
            setVolume(0)
        }
    }

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

    return (
        <div className={styles.container}>
            <div className={styles.audio}>
                <div className={styles.controls}>
                    <Rewind rewind={backFive} color={color} />
                    <PlayPauseButton
                        playing={playing}
                        togglePlaying={togglePLaying}
                        color={color}
                    />
                    <Skip skip={forwardFive} color={color} />
                </div>
                <div className={styles.playbackContainer}>
                    <div className={styles.volume}>
                        <IconButton color={color} onClick={() => handleMute()}>
                            {ref.current?.muted ? (
                                <VolumeOffIcon />
                            ) : (
                                <VolumeUpIcon />
                            )}
                        </IconButton>
                        <Slider
                            aria-label="Volume"
                            min={0}
                            max={100}
                            size="small"
                            value={volume * 100}
                            color={color as 'primary' | 'secondary' | undefined}
                            onChange={(e: any) => volumeChange(e)}
                            className={styles.volumeSlider}
                        />
                    </div>
                    <Typography fontWeight={'100'}>
                        {duration >= 18000
                            ? new Date(mediaTime * 1000)
                                  .toISOString()
                                  .substring(11, 19)
                            : new Date(mediaTime * 1000)
                                  .toISOString()
                                  .substring(14, 19)}
                    </Typography>
                    <Slider
                        value={mediaTime ?? 0}
                        min={0}
                        max={duration || 100}
                        onChange={scrubberChange}
                        sx={{ margin: '0 1rem', width: '100%' }}
                        color={color as 'primary' | 'secondary' | undefined}
                    />
                    <Typography fontWeight={'100'}>
                        {duration
                            ? new Date(duration * 1000)
                                  .toISOString()
                                  .substring(14, 19)
                            : '01:40'}
                    </Typography>
                    <div className={styles.settings}>
                        <IconButton
                            aria-label="settings"
                            size="small"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            color={color}
                            onClick={(
                                event: React.MouseEvent<HTMLButtonElement>
                            ) => setAnchorEl(event.currentTarget)}
                        >
                            <SettingsIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
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
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
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
        </div>
    )
}

export default AudioPlayer
