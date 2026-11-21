import React from "react";
import SendButton from "../../components/UI/SendButton";

export default {
  title: "UI/SendButton",
  component: SendButton,
};

const Template = (args) => <SendButton {...args} />;

export const Default = Template.bind({});
Default.args = {}; 