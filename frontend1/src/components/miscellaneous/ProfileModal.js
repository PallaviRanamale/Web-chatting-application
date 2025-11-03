import React from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import {IconButton} from '@chakra-ui/button'
import {ViewIcon} from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    Text,
} from '@chakra-ui/react';

const ProfileModal = ({user, children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        {children ? (
            <span onClick={onOpen}>{children}</span>
        ) : (
            <IconButton display={{ base: "flex"}} icon={<ViewIcon/>} onClick={onOpen} />
        )}

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent h="410px">
                <ModalHeader
                    fontSize="40px"
<<<<<<< HEAD
                    fontFamily="Montserrat"
                    d="flex"
=======
                    fontFamily="Work sans"
                    display="flex"
>>>>>>> Coding11-12
                    justifyContent="center"
                >
                    {user.name}
                </ModalHeader>

                <ModalCloseButton />

                <ModalBody
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={user.pic}
                    alt={user.name}
                    />
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        fontFamily="Montserrat"
                    >
                        Email: {user.email}
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  );
};

export default ProfileModal
