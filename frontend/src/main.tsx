import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { mode, GlobalStyleProps } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      color: mode('#090d16', '#e9edf6')(props),
      bg: mode('#e5ebfa', '#050b1a')(props),
    },
  }),
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const colors = {
  primary: {
    light: '#1d3263',
    dark: '#9cb1e2',
  },
  secondary: {
    light: '#7493dc',
    dark: '#23428b',
  },
  accent: {
    light: '#2856c3',
    dark: '#3c6bd7',
  },
  borderColor: {
    100: 'rgba(255, 255, 255, 0.1)',
  },
};

const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
