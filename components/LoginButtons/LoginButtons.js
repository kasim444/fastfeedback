import React from 'react';
import { VStack, Button } from '@chakra-ui/react';
import { ImGithub } from 'react-icons/im';
import { Google } from '@/components/Icons/index';
import { useAuth } from '@/lib/auth';

function LoginButtons() {
  const auth = useAuth();
  return (
    <VStack>
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
    </VStack>
  );
}

export default LoginButtons;
