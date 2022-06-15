import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import AudioPlayer from './audioplayer'

const meta: Meta = {
    title: 'Audio Player',
    component: AudioPlayer,
}

export default meta

const Template: Story<typeof AudioPlayer> = () => (
    <AudioPlayer src="source" transcription="dicks" />
)

export const Default = Template.bind({})
