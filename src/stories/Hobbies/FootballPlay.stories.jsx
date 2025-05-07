import FootballPlay from '../../components/Hobbies/FootballPlay';

export default {
  title: 'Hobbies/FootballPlay',
  component: FootballPlay,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'football-play',
      values: [
        {
          name: 'football-play',
          value: 'url("/src/stories/backgrounds/FootballPlay.jpg")',
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

export const Default = {
  args: {},
}; 