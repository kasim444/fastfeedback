import { useAuth } from '@/lib/auth';
import { Text, Button, Flex, Box } from '@chakra-ui/react';
import { Feedback, FeedbackLink, Logo, LoginButtons } from '@/components/index';
import Head from 'next/head';
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
          minH="100vh"
          maxW="400px"
          margin="0 auto">
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/sites"
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
              <Button as="a" size="lg" fontWeight="medium" href="/sites">
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
              <LoginButtons />
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
