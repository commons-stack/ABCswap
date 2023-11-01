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
import MarkdownText from './MarkdownText';

interface MarkdownModalProps {
    linkText: string;
    src: string;
}

export default function MarkdownModal({ src, linkText }: MarkdownModalProps) {

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
                            <MarkdownText src={src} />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
