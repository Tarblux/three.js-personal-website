import LanguagesMain from '../../components/Languages/LanguagesMain';

export default {
  title: 'Languages/LanguagesMain',
  component: LanguagesMain,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'languages-main',
      values: [
        {
          name: 'languages-main',
          value: 'url("/src/stories/backgrounds/LanguagesMain.jpg")',
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