import background from "../backgrounds/Contact.jpg";
import Contact from '../../components/Contact/Contact';

export default {
  title: 'Contact/Contact',
  component: Contact,
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

export const Default = {
  args: {},
}; 