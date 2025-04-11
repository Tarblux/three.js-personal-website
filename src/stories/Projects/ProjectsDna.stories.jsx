import ProjectsDna from '../../components/Projects/ProjectsDna';

export default {
  title: 'Projects/ProjectsDna',
  component: ProjectsDna,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'projects-dna',
      values: [
        {
          name: 'projects-dna',
          value: 'url("/src/stories/backgrounds/ProjectsDna.jpg")',
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