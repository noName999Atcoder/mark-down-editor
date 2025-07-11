import React from 'react';
import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from '@storybook/react';
import { ChakraProvider,defaultSystem   } from '@chakra-ui/react';


const preview: Preview = {
  parameters: {
    tags: ['autodocs'],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo', // アクセシビリティの設定
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
    withThemeByClassName({
      defaultTheme: "light",
      themes: { light: "", dark: "dark" },
    }),
  ],
};

export default preview;
