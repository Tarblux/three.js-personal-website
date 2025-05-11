import React from 'react';
import CollegeClubs from '../../components/Education/CollegeClubs';

export default {
  title: 'Education/CollegeClubs',
  component: CollegeClubs,
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

const Template = (args) => <CollegeClubs {...args} />;

export const Default = Template.bind({});
Default.args = {}; 