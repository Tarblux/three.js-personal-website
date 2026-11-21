import background from "../backgrounds/Education.jpg";
import EducationKzoo from '../../components/Education/EducationKzoo';

export default {
  title: 'Education/EducationKzoo',
  component: EducationKzoo,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'education',
      values: [
        {
          name: 'education',
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