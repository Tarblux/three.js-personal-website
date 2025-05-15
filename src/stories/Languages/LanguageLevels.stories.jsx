import React, { useRef } from 'react';
import LanguageLevels from '../../components/Languages/LanguageLevels';
import { languageLevelsData } from '../../data/languageLevelsData.js';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Languages/LanguageLevels',
  component: LanguageLevels,
  argTypes: {
    languageLevelsData: { control: 'object' },
    setHighlightedLanguage: { action: 'setHighlightedLanguage' },
  },
};

const Template = (args) => {
  const hoverTimeoutRef = useRef(null);
  return <LanguageLevels {...args} hoverTimeoutRef={hoverTimeoutRef} />;
};

export const Default = Template.bind({});
Default.args = {
  languageLevelsData: languageLevelsData,
  setHighlightedLanguage: action('setHighlightedLanguage'),
};

// export const Empty = Template.bind({});
// Empty.args = {
//   languageLevelsData: [],
//   setHighlightedLanguage: action('setHighlightedLanguage'),
// };

// export const SingleLanguage = Template.bind({});
// SingleLanguage.args = {
//   languageLevelsData: [languageLevelsData[0]], // Just English
//   setHighlightedLanguage: action('setHighlightedLanguage'),
// }; 