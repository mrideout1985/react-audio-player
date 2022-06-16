import * as React from 'react'
import { Meta, Story } from '@storybook/react'
import AudioPlayer from './audioplayer'

const meta: Meta = {
    title: 'Audio Player',
    component: AudioPlayer,
    argTypes: {
        color: [
            'inherit',
            'default',
            'primary',
            'secondary',
            'error',
            'info',
            'success',
            'warning',
        ],
    },
}

export default meta

const Template: Story<typeof AudioPlayer> = ({ color }: any) => (
    <AudioPlayer
        src="http://www.hyperion-records.co.uk/audiotest/18%20MacCunn%20The%20Lay%20of%20the%20Last%20Minstrel%20-%20Part%202%20Final%20chorus%20O%20Caledonia!%20stern%20and%20wild.MP3"
        color={color}
    />
)

export const Player = Template.bind({})
Player.args = {
    color: 'primary',
    src: 'source',
}
