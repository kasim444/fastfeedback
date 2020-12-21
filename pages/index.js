import {useAuth} from '@/lib/auth';
import {Heading, Text, Button, Code, Icon, Box, Flex} from '@chakra-ui/react';
import {Logo} from '@/components/index';
import Head from 'next/head';

export default function Home() {
  const auth = useAuth();

  return (
    <Flex as="main" direction="column" align="center" justifyContent="center" height="100vh">
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <Logo />
      <Heading fontWeight="medium">Fast Feedback</Heading>
      <Text>
        current user: <Code>{auth?.user?.email || 'None'}</Code>
      </Text>
      {auth?.user ? (
        <Button variant="link" mt={4} onClick={(e) => auth.signout()}>
          Sign Out
        </Button>
      ) : (
        <Button mt={4} onClick={(e) => auth.signinWithGithub()}>
          Sign In With GitHub
        </Button>
      )}
    </Flex>
  );
}
