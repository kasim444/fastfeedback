import {ChakraProvider} from '@chakra-ui/react';
import {AuthProvider} from '../lib/auth';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/globalStyle';

function MyApp({Component, pageProps}) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
