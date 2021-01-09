import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from '@chakra-ui/react';
import { AddSiteModal } from '@/components/index';
import { AddIcon } from '@chakra-ui/icons';

function SiteTableHeader() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.700" fontSize="sm">
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={4}>Sites</Heading>
        <AddSiteModal leftIcon={<AddIcon w={3} />}>Add Site</AddSiteModal>
      </Flex>
    </>
  );
}

export default SiteTableHeader;
