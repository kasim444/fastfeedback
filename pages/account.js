import { Button, Flex, Avatar, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { DashboardShell } from '@/components/index';

const Account = () => {
  const { user, signout } = useAuth();

  return (
    <DashboardShell>
      <Flex
        direction="column"
        maxW="600px"
        align={['left', 'center']}
        margin="0 auto"
      >
        <Flex direction="column" align={['left', 'center']} ml={4}>
          <Avatar
            w={['3rem', '6rem']}
            h={['3rem', '6rem']}
            mb={4}
            src={user?.photoUrl}
          />
          <Heading letterSpacing="-1px">{user?.name}</Heading>
          <Text>{user?.email}</Text>
        </Flex>
        <Flex justify="flex-end">
          <Button variant="ghost" ml={4} onClick={() => signout()}>
            Log Out
          </Button>
        </Flex>
      </Flex>
    </DashboardShell>
  );
};

export default Account;