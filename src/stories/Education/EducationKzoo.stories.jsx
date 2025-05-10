import EducationKzoo from '../../components/Education/EducationKzoo';

export default {
  title: 'Education/EducationKzoo',
  component: EducationKzoo,
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