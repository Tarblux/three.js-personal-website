import KombuchaMenu from '../../components/Hobbies/KombuchaMenu';

export default {
  title: 'Hobbies/KombuchaMenu',
  component: KombuchaMenu,
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