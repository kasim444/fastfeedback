import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from '@chakra-ui/react';

function FeedbackTableHeader() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.700" fontSize="sm">
            Feedback
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={4}>All Feedback</Heading>
      </Flex>
    </>
  );
}

export default FeedbackTableHeader;
