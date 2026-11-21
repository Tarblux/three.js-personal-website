import background from "../backgrounds/Languages.jpg";
import Languages from '../../components/Languages/Languages';

export default {
  title: 'Languages/Languages',
  component: Languages,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'languages',
      values: [
        {
          name: 'languages',
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