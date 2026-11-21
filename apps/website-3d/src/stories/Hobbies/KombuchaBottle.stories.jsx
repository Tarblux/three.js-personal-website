import React from 'react';
import KombuchaBottle from '../../components/Hobbies/KombuchaBottle';

export default {
  title: 'Hobbies/KombuchaBottle',
  component: KombuchaBottle,
};

const Template = (args) => <KombuchaBottle {...args} />;

export const Default = Template.bind({});
Default.args = {}; 