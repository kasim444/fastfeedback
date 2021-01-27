import React from 'react';
import { Box, Heading, Text, Divider, Flex } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { ImGithub } from 'react-icons/im';
import { Google } from '@/components/Icons/index';
import { useTheme } from '@/utils/index';

const Feedback = ({ author, text, createdAt, provider, isLast, settings }) => {
  const colorMode = useTheme();
  const authorColor = {
    light: 'gray.900',
    dark: 'gray.200'
  };
  const textColor = {
    light: 'gray.800',
    dark: 'gray.300'
  };
  const dividerColor = {
    light: 'gray.200',
    dark: 'gray.700'
  };

  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Flex align="center">
        <Heading
          size="sm"
          as="h3"
          mb={0}
          color={authorColor[colorMode]}
          fontWeight="medium"
        >
          {author}
        </Heading>
        {settings?.icons && <Box marginLeft={2}>
          {
            provider === 'google.com' ? (
              <Google />
            ) : (
                <ImGithub />
              )
          }
        </Box>}
      </Flex>
      {settings?.timestamp && (
        <Text color="gray.500" mb={4} fontSize="xs">
          {format(parseISO(createdAt), 'PPpp')}
        </Text>
      )}
      <Text color={textColor[colorMode]}>{text}</Text>
      {!isLast && (
        <Divider borderColor={dividerColor[colorMode]} mt={6} mb={6} />
      )}
    </Box>
  );
};

export default Feedback;