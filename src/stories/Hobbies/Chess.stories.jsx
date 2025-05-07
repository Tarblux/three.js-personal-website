import Chess from '../../components/Hobbies/Chess';

export default {
  title: 'Hobbies/Chess',
  component: Chess,
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