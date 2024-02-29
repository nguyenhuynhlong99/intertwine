import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  theme as chakraTheme,
} from '@chakra-ui/react';
import { mode, GlobalStyleProps } from '@chakra-ui/theme-tools';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

const styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      color: mode('#090d16', '#e9edf6')(props),
      bg: mode('#e5ebfa', '#050b1a')(props),
    },
    li: {
      listStyle: 'none',
    },
  }),
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const colors = {
  bg: {
    light: '#e5ebfa',
    dark: '#050b1a',
  },
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
  ...chakraTheme.fonts,
  body: `Poppins,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  heading: `Poppins,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
};

const Input = {
  baseStyle: {
    field: {
      border: '1px solid',
      borderColor: colors.gray.light,
      backgroundColor: 'transparent',

      _invalid: {
        borderColor: 'red.100',
        // boxShadow: `0 0 0 1px red`,
      },

      _hover: {
        borderColor: colors.accent.light,
      },
      _focusVisible: {
        borderColor: colors.accent.light,
        boxShadow: `0 0 0 1px ${colors.accent.light}`,
      },
      _focus: {
        borderColor: colors.accent.light,
        boxShadow: `0 0 0 1px ${colors.accent.light}`,
      },

      _dark: {
        backgroundColor: 'transparent',
        borderColor: colors.gray.dark,
        _hover: {
          borderColor: colors.primary.dark,
        },
        _focusVisible: {
          borderColor: colors.accent.dark,
          boxShadow: `0 0 0 1px ${colors.accent.dark}`,
        },
        _focus: {
          borderColor: colors.accent.light,
          boxShadow: `0 0 0 1px ${colors.accent.dark}`,
        },
        _invalid: {
          borderColor: 'red.600',
          boxShadow: `unset`,
        },
      },
    },
  },
  defaultProps: {
    variant: null,
  },
};

const theme = extendTheme({
  config,
  styles,
  colors,
  fonts,
  components: {
    Input,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":username"
              element={
                <ProtectedRoute>
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route path=":username/post/:pid" element={<PostPage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
