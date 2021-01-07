import { useAuth } from '@/lib/auth';
import { Text, Button, Flex } from '@chakra-ui/react';
import { Logo } from '@/components/index';
import Head from 'next/head';

export default function Home() {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      maxW="400px"
      margin="0 auto">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
              }
            `
          }}
        />
        <title>Fast Feedback</title>
      </Head>
      <Logo />
      <Text mb={4}>
        <Text as="span" fontWeight="bold" display="inline">
          Fast Feedback
        </Text>
        {` is the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
      </Text>
      {auth.user ? (
        <>
          <Button as="a" size="sm" fontWeight="medium" href="/dashboard">
            View Dashboard
          </Button>
          <Button mt={2} size="sm" fontWeight="medium" onClick={() => auth.signout()}>
            Log Out
          </Button>
        </>
      ) : (
        <Button mt={4} size="sm" fontWeight="medium" onClick={(e) => auth.signinWithGithub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}
