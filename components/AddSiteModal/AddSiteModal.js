import React from 'react';
import { mutate } from 'swr';
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
import { useAuth } from '@/lib/auth';

const AddSiteModal = ({ children, leftIcon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors, formState } = useForm();
  const toast = useToast();
  const auth = useAuth();

  const submitCreateSite = ({ name, link }, e) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url: link
    };
    const { id } = createSite(newSite);
    toast({
      title: 'Success!',
      description: `We've added your site.`,
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => ({ sites: [{ id, ...newSite }, ...data.sites] }),
      false
    );
    e.target.reset();
    onClose();
  };

  return (
    <>
      <Button
        backgroundColor="gray.900"
        color="white"
        fontWeight="bold"
        _hover={{ bg: 'gray.700' }}
        leftIcon={leftIcon}
        onClick={onOpen}>
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(submitCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                name="name"
                ref={register({ required: true })}
                placeholder="My Site"
              />
              <FormErrorMessage>{errors.name && 'Site is required'}</FormErrorMessage>
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
