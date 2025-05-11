import React from 'react';
import CollegeJobs from '../../components/Education/CollegeJobs';

export default {
  title: 'Education/CollegeJobs',
  component: CollegeJobs,
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

const Template = (args) => <CollegeJobs {...args} />;

export const Default = Template.bind({});
Default.args = {}; 