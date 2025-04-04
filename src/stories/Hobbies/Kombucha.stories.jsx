import Kombucha from '../../components/Hobbies/Kombucha';

export default {
  title: 'Hobbies/Kombucha',
  component: Kombucha,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'kombucha',
      values: [
        {
          name: 'kombucha',
          value: 'url("/src/stories/backgrounds/Kombucha.jpg")',
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