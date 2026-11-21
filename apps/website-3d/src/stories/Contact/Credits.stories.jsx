import background from "../backgrounds/Contact.jpg";
import React from 'react';
import Credits from '../../components/Contact/Credits';

export default {
  title: 'Contact/Credits',
  component: Credits,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'contact',
      values: [
        {
          name: 'contact',
          value: `url("${background}")`,
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

export const Default = () => <Credits />; 