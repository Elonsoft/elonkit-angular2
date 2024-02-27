import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-controls',
    '@storybook/addon-outline',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-actions',
    'storybook-dark-mode'
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [
    { from: '../src/', to: '/' }
  ]

};
export default config;
