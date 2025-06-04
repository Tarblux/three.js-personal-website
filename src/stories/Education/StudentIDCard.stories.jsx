import React from 'react';
import StudentIDCard from '../../components/Education/StudentIDCard';

export default {
  title: 'Education/StudentIDCard',
  component: StudentIDCard,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <StudentIDCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  school: {
    name: 'Yonsei University',
    logo: '/images/Education/education-yonsei_logo.webp',
    idImage: '/images/Education/education-yonsei_id.webp',
    studentId: '2023123456',
    degrees: [
      {
        type: 'Bachelor of Science',
        major: 'Computer Science'
      }
    ],
    minors: ['Mathematics', 'Data Science'],
    years: '2020 - 2024'
  }
}; 