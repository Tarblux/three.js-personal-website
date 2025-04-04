import Education from '../../components/Education/Education';

export default {
  title: 'Education/Education',
  component: Education,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'education',
      values: [
        {
          name: 'education',
          value: 'url("/src/stories/backgrounds/Education.jpg")',
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