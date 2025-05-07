import Career from '../../components/Career/Career';

export default {
  title: 'Career/Career',
  component: Career,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'career',
      values: [
        {
          name: 'career',
          value: 'url("/src/stories/backgrounds/Career.jpg")',
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