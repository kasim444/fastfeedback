import {useAuth} from '@/lib/auth';
import {Heading, Text, Button, Code} from '@chakra-ui/react';

export default function Home() {
    const auth = useAuth();

    return (
        <div>
            <Heading fontWeight="medium">Fast Feedback</Heading>
            <Text>
                current user: <Code>{auth?.user?.email || 'None'}</Code>
            </Text>
            {auth?.user ? (
                <Button onClick={(e) => auth.signout()}>Sign Out</Button>
            ) : (
                <Button onClick={(e) => auth.signinWithGithub()}>Sign In With GitHub</Button>
            )}
        </div>
    );
}
