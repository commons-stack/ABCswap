import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Link,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import LegalInfo from './LegalInfo';

interface LegalModalProps {
    linkText: string;
    legalMarkdown: string;
}

export default function LegalModal({ legalMarkdown, linkText }: LegalModalProps) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Link onClick={onOpen}><Text as="u">{linkText}</Text></Link>
            <Modal size={'5xl'} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent border="1px solid black" borderRadius="16px">
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack m="5%" color="brand.900" spacing={5} alignItems="flex-start">
                            <LegalInfo legalMarkdown={legalMarkdown} />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
