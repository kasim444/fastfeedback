import React from 'react';
import { Box, Heading, Text, Divider, Icon, Flex } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { ImGithub } from 'react-icons/im';
import { Google } from '@/components/Icons/index';

const Feedback = ({ author, text, createdAt, provider, isLast, settings }) => {
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Flex align="center">
        <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
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
      <Text color="gray.800">{text}</Text>
      {!isLast && (
        <Divider
          borderColor="gray.200"
          backgroundColor="gray.200"
          mt={6}
          mb={6}
        />
      )}
    </Box>
  )
};

export default Feedback;