import React from 'react';
import { Box, Code, Link, Switch } from '@chakra-ui/react';
import { Table, Tr, Th, Td, RemoveButton } from '@/components/index';

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {allFeedback.map((feedback) => (
            <Box as="tr" key={feedback.id}>
              <Td fontWeight="medium">{feedback.author}</Td>
              <Td>
                <Link href={feedback.url} isExternal>
                  {feedback.text}
                </Link>
              </Td>
              <Td>
                <Code>{'/'}</Code>
              </Td>
              <Td>
                <Switch colorScheme="green" defaultIsChecked={feedback.status === 'active'} />
              </Td>
              <Td>
                <RemoveButton docId={feedback.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
