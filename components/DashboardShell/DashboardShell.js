import {Logo} from '@/components/index';
import {useAuth} from '@/lib/auth';
import {Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, Link, Stack} from '@chakra-ui/react';

const DashboardShell = ({children}) => {
  const auth = useAuth();
  return (
    <Flex flexDirection="column">
      <Flex backgroundColor="#ffffff" alignItems="center" justifyContent="space-between" px={8} py={4}>
        <Stack spacing={4} isInline alignItems="center">
          <Link>Sites</Link>
          <Link>Feedback</Link>
        </Stack>
        <Flex alignItems="center">
          <Link mr={2}>Account</Link>
          <Avatar size="sm" src={auth?.user?.photoURL} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.50" height="100vh" p={8}>
        <Flex flexDirection="column" color="#000000" width="100%" maxWidth="800px" ml="auto" mr="auto">
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading mb={4}>Sites</Heading>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
