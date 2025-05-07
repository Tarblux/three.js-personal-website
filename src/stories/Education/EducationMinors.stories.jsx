import EducationMinors from '../../components/Education/EducationMinors';

export default {
  title: 'Education/EducationMinors',
  component: EducationMinors,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'education-minors',
      values: [
        {
          name: 'education-minors',
          value: 'url("/src/stories/backgrounds/EducationMinors.jpg")',
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