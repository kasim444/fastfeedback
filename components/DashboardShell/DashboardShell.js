import { useAuth } from '@/lib/auth';
import {
  Avatar,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Link,
  Stack
} from '@chakra-ui/react';
import { AddSiteModal } from '@/components/index';
import { AddIcon } from '@chakra-ui/icons';

const DashboardShell = ({ children }) => {
  const auth = useAuth();
  return (
    <Flex flexDirection="column">
      <Flex
        backgroundColor="#ffffff"
        alignItems="center"
        justifyContent="space-between"
        px={8}
        py={4}>
        <Stack spacing={4} isInline alignItems="center">
          <Link>Sites</Link>
          <Link>Feedback</Link>
        </Stack>
        <Flex alignItems="center">
          {auth?.user && (
            <Button variant="ghost" mr={2} onClick={() => auth.signout()}>
              Log Out
            </Button>
          )}
          <Avatar size="sm" src={auth?.user?.photoURL} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.50" height="100vh" p={8}>
        <Flex
          flexDirection="column"
          color="#000000"
          width="100%"
          maxWidth="800px"
          ml="auto"
          mr="auto">
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justifyContent="space-between">
            <Heading mb={4}>Sites</Heading>
            <AddSiteModal leftIcon={<AddIcon w={3} />}>Add Site</AddSiteModal>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
