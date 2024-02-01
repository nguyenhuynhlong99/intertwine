import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { mode, GlobalStyleProps } from '@chakra-ui/theme-tools';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';

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
  support: {
    light: '#DBE2F2',
    dark: '#0D1527',
  },
  borderColor: {
    light: '#DBE1EF',
    dark: '#141A28',
  },
  gray: {
    light: '#7D828E',
    dark: '#868B97',
    // light: '#616161',
    // dark: '#1e1e1e',
  },
};

const fonts = {
  body: 'Poppins',
};

const theme = extendTheme({ config, styles, colors, fonts });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path=":username" element={<UserPage />} />
            <Route path=":username/post/:pid" element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
