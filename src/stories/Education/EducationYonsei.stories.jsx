import EducationYonsei from '../../components/Education/EducationYonsei';

export default {
  title: 'Education/EducationYonsei',
  component: EducationYonsei,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'education-yonsei',
      values: [
        {
          name: 'education-yonsei',
          value: 'url("/src/stories/backgrounds/EducationYonsei.jpg")',
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