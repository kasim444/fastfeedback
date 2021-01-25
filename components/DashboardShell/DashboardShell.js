import { useAuth } from '@/lib/auth';
import { Avatar, Button, Flex, Link, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Logo } from '@/components/index';

const DashboardShell = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const handleLogOut = () => router.push('/account');

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
          <NextLink href="/sites">
            <Link>Sites</Link>
          </NextLink>
          <NextLink href="/feedback">
            <Link>Feedback</Link>
          </NextLink>
        </Stack>
        <Flex alignItems="center">
          {auth?.user && (
            <Button variant="ghost" onClick={handleLogOut}>
              Account
              <Avatar marginLeft={4} size="sm" src={auth?.user?.photoUrl} />
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.50" minHeight="100vh" p={8}>
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
