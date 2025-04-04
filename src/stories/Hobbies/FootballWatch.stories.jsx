import FootballWatch from '../../components/Hobbies/FootballWatch';

export default {
  title: 'Hobbies/FootballWatch',
  component: FootballWatch,
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

export const Default = {
  args: {},
}; 