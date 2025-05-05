import ProjectsConstruction from '../../components/Projects/ProjectsConstruction';

export default {
  title: 'Projects/ProjectsConstruction',
  component: ProjectsConstruction,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'projects-construction',
      values: [
        {
          name: 'projects-construction',
          value: 'url("/src/stories/backgrounds/ProjectConstruction.jpg")',
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