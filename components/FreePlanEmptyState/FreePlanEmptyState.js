import {DashboardShell} from '@/components/index';
import {Box, Button, Heading, Text} from '@chakra-ui/react';

function FreePlanEmptyState() {
  return (
    <DashboardShell>
      <Box backgroundColor="#ffffff" width="100%" p={8} borderRadius="8px">
        <Heading size="md" as="h2">
          Get feedback on your site instantly.
        </Heading>
        <Text>Start today, then grow us.</Text>
        <Button variant="solid" size="md">
          Upgrade to Starter
        </Button>
      </Box>
    </DashboardShell>
  );
}

export default FreePlanEmptyState;
