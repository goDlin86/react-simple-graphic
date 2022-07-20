import React from 'react';

import { SimpleGraphic } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/SimpleGraphic',
  component: SimpleGraphic,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <SimpleGraphic {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  data: [{x: 0, y: 60}, {x: 100, y: 90}, {x: 200, y: 90}, {x: 300, y: 120}, {x: 400, y: 100}, {x: 500, y: 120}]
};
