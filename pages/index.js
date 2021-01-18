import { useAuth } from '@/lib/auth';
import { Text, Button, Flex, Box } from '@chakra-ui/react';
import { Feedback, FeedbackLink, Logo } from '@/components/index';
import Head from 'next/head';
import { ImGithub } from 'react-icons/im';
import { Google } from '@/components/Icons/index';
import { getAllFeedback } from '@/lib/db-admin';

const SITE_ID = '8GSz7HUukpXT6Ll6tADC';

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: feedback || []
    },
    revalidate: 1
  };
}

export default function Home({ allFeedback }) {
  const auth = useAuth();
  return (
    <>
      <Box bg="gray.100" py={16}>
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
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}>
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  );
}
