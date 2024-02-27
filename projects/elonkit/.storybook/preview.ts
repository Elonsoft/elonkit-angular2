import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { dark, light } from './theme';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark,
      light,
      current: 'light',
      stylePreview: true
    }
  },
};

export default preview;
