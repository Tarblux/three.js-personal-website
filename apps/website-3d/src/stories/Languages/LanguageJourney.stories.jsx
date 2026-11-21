import React from 'react';
import LanguageJourney from '../../components/Languages/LanguageJourney';
import { languageJourneyData } from '../../data/languageJourneyData.js';

export default {
  title: 'Languages/LanguageJourney',
  component: LanguageJourney,
  argTypes: {
    languageJourneyData: { control: 'object' },
  },
};

const Template = (args) => <LanguageJourney {...args} />;

export const Default = Template.bind({});
Default.args = {
  languageJourneyData: languageJourneyData,
};

export const FewerSteps = Template.bind({});
FewerSteps.args = {
  languageJourneyData: languageJourneyData.slice(0, 3), // First 3 steps
};

export const Empty = Template.bind({});
Empty.args = {
  languageJourneyData: [],
}; 