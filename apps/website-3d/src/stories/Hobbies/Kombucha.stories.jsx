import background from "../backgrounds/Kombucha.jpg";
import Kombucha from '../../components/Hobbies/Kombucha';

export default {
  title: 'Hobbies/Kombucha',
  component: Kombucha,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'kombucha',
      values: [
        {
          name: 'kombucha',
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