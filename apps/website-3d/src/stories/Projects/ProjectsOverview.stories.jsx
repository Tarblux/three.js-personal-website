import background from "../backgrounds/ProjectsOverview.jpg";
import ProjectsOverview from '../../components/Projects/ProjectsOverview';

export default {
  title: 'Projects/ProjectsOverview',
  component: ProjectsOverview,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'projects-overview',
      values: [
        {
          name: 'projects-overview',
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