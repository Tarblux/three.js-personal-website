import ProjectsWarehouse from '../../components/Projects/ProjectsWarehouse';

export default {
  title: 'Projects/ProjectsWarehouse',
  component: ProjectsWarehouse,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'projects-warehouse',
      values: [
        {
          name: 'projects-warehouse',
          value: 'url("/src/stories/backgrounds/ProjectsWarehouse.jpg")',
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