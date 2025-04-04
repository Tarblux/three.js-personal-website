import Introduction from '../../components/Introduction/Introduction';

export default {
  title: 'Introduction/Introduction',
  component: Introduction,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'introduction',
      values: [
        {
          name: 'introduction',
          value: 'url("/src/stories/backgrounds/Introduction.jpg")',
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