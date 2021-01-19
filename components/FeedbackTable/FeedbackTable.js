import React from 'react';
import { Box } from '@chakra-ui/react';
import { Table, Tr, Th, FeedbackRow } from '@/components/index';

const FeedbackTable = ({ allFeedback }) => {
  console.log({allFeedback})

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
            <FeedbackRow key={feedback.id} {...feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
