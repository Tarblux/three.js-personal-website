import LanguagesBasic from '../../components/Languages/LanguagesBasic';

export default {
  title: 'Languages/LanguagesBasic',
  component: LanguagesBasic,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'languages-basic',
      values: [
        {
          name: 'languages-basic',
          value: 'url("/src/stories/backgrounds/LanguagesBasic.jpg")',
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