import { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { AuthProvider } from '../lib/auth';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/globalStyle';
import { useRouter } from 'next/router';
import analytics from '@/lib/analytics'
import SEO from '../next-seo.config'

function MyApp({ Component, pageProps }) {
  const routers = useRouter();

  useEffect(() => {
    const logEvent = (url) => {
      analytics().setCurrentScreen(url);
      analytics().logEvent('screen_view');
    };

    routers.events.on('routeChangeComplete', logEvent);
    //For First Page
    logEvent(window.location.pathname);

    //Remvove Event Listener after un-mount
    return () => {
      routers.events.off('routeChangeComplete', logEvent);
    };
  }, []);

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <DefaultSeo {...SEO} />
        <GlobalStyle />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
