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
          value: 'url("/src/stories/backgrounds/ProjectsOverview.jpg")',
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