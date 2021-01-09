import { useAuth } from '@/lib/auth';
import { Avatar, Button, Flex, Link, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Logo } from '@/components/index';

const DashboardShell = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();

  const handleLogOut = () => {
    auth.signout();
    router.push('/');
  };

  return (
    <Flex flexDirection="column">
      <Flex
        backgroundColor="#ffffff"
        alignItems="center"
        justifyContent="space-between"
        px={8}
        py={4}>
        <Stack spacing={4} isInline alignItems="center">
          <NextLink href="/">
            <Link>
              <Logo width={36} height={36} />
            </Link>
          </NextLink>
          <NextLink href="/dashboard">
            <Link>Sites</Link>
          </NextLink>
          <NextLink href="/feedback">
            <Link>Feedback</Link>
          </NextLink>
        </Stack>
        <Flex alignItems="center">
          {auth?.user && (
            <Button variant="ghost" mr={2} onClick={handleLogOut}>
              Log Out
            </Button>
          )}
          <Avatar size="sm" src={auth?.user?.photoUrl} />
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
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
