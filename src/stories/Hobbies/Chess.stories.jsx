import ChessDashboard from '../../components/Hobbies/ChessDashboard';

export default {
  title: 'Hobbies/ChessDashboard',
  component: ChessDashboard,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'chess',
      values: [
        {
          name: 'chess',
          value: 'url("/src/stories/backgrounds/Chess.jpg")',
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