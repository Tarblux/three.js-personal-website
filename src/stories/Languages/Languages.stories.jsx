import Languages from '../../components/Languages/Languages';

export default {
  title: 'Languages/Languages',
  component: Languages,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'languages',
      values: [
        {
          name: 'languages',
          value: 'url("/src/stories/backgrounds/Languages.jpg")',
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