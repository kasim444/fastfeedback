import { AddSiteModal } from '@/components/index';
import { Flex, Heading, Text } from '@chakra-ui/react';

function EmptyState() {
  return (
    <Flex
      backgroundColor="#ffffff"
      width="100%"
      p={16}
      borderRadius="8px"
      direction="column"
      alignItems="center"
      justifyContent="center">
      <Heading size="lg" as="h2" mb={4}>
        You haven't added any sites
      </Heading>
      <Text mb={8}>Welcome 👋 &nbsp; Let's get started.</Text>
      <AddSiteModal />
    </Flex>
  );
}

export default EmptyState;
