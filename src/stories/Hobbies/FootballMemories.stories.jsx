import React from 'react';
import FootballMemories from '../../components/Hobbies/FootballMemories';

export default {
    title: 'Hobbies/FootballMemories',
    component: FootballMemories,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'football-watch',
            values: [
                {
                    name: 'football-watch',
                    value: 'url("/src/stories/backgrounds/FootballWatch.jpg")',
                },
                {
                    name: 'light',
                    value: '#ffffff',
                },
                {
                    name: 'dark',
                    value: '#333333',
                },
            ],
        },
    },
};

const Template = (args) => <FootballMemories {...args} />;

export const Default = Template.bind({});
Default.args = {}; 