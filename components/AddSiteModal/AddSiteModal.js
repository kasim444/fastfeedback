import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useDisclosure
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { createSite } from '@/lib/db';
import { useToast } from '@chakra-ui/react';

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors, formState } = useForm();
  const toast = useToast();

  const submitCreateSite = (data, e) => {
    createSite(data);
    toast({
      title: 'Site is added.',
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    e.target.reset();
  };

  return (
    <>
      <Button variant="solid" size="md" maxWidth="200px" fontWeight="medium" onClick={onOpen}>
        Add your first site
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(submitCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.site}>
              <FormLabel htmlFor="site">Name</FormLabel>
              <Input
                id="site"
                name="site"
                ref={register({ required: true })}
                placeholder="My Site"
              />
              <FormErrorMessage>{errors.site && 'Site is required'}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.link}>
              <FormLabel htmlFor="link">Link</FormLabel>
              <Input
                name="link"
                placeholder="https://website.com"
                ref={register({ required: true })}
              />
              <FormErrorMessage>{errors.link && 'Link is required'}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
              isLoading={formState.isSubmitting}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
