import EducationMajors from '../../components/Education/EducationMajors';

export default {
  title: 'Education/EducationMajors',
  component: EducationMajors,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'education-majors',
      values: [
        {
          name: 'education-majors',
          value: 'url("/src/stories/backgrounds/EducationMajors.jpg")',
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