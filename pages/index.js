import { useAuth } from '@/lib/auth';
import { Text, Button, Flex } from '@chakra-ui/react';
import { Logo } from '@/components/index';
import Head from 'next/head';
import { ImGithub } from 'react-icons/im';
import { Google } from '@/components/Icons/index';

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
      <Text mb={4} p={4} textAlign="center">
        <Text as="span" fontSize="lg" fontWeight="bold" display="inline">
          Fast Feedback
        </Text>
        {` is the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
      </Text>
      {auth.user ? (
        <>
          <Button as="a" size="lg" fontWeight="medium" href="/dashboard">
            View Dashboard
          </Button>
          <Button
            mt={2}
            size="lg"
            variant="link"
            fontWeight="medium"
            onClick={() => auth.signout()}>
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Button
            mt={4}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            size="lg"
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
            fontWeight="medium"
            onClick={(e) => auth.signinWithGithub()}
            leftIcon={<ImGithub />}>
            Sign In with GitHub
          </Button>
          <Button
            mt={4}
            variant="outline"
            backgroundColor="white"
            color="gray.800"
            fontWeight="medium"
            size="lg"
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.200', transform: 'scale(0.95)' }}
            fontWeight="medium"
            onClick={(e) => auth.signinWithGoogle()}
            leftIcon={<Google />}>
            Sign In with Google
          </Button>
        </>
      )}
    </Flex>
  );
}
