import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import { DashboardShell, SiteHeader, Feedback, LoginButtons } from '@/components/index';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()]
    }
  }));

  return {
    paths,
    fallback: true
  };
}

const FeedbackPage = ({ initialFeedback, site }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const [siteId, route] = router.query.site;

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId: siteId,
      route: route || '/',
      author: auth.user.name,
      authorId: auth.user.uid,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    };
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
    inputEl.current.value = '';
  };

  const LoginOrLeaveFeedback = () =>
    auth.user ? (
      <Button
        type="submit"
        isDisabled={router.isFallback}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        Leave Feedback
      </Button>
    ) : (
        <LoginButtons />
      );

  return (
    <DashboardShell>
      <SiteHeader
        isSiteOwner={true}
        site={site}
        siteId={siteId}
        route={route}
      />
      <Box display="flex" flexDirection="column" width="full" maxWidth="700px" margin="0 auto">
        {auth.user && (
          <Box as="form" onSubmit={onSubmit}>
            <FormControl my={8}>
              <FormLabel htmlFor="comment">Comment</FormLabel>
              <Input ref={inputEl} id="comment" placeholder="Leave a comment" />
              {!auth.loading && <LoginOrLeaveFeedback />}
            </FormControl>
          </Box>
        )}
        {allFeedback && allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </DashboardShell>
  );
};

export default FeedbackPage;
