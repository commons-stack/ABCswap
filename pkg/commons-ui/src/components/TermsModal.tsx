import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Link,
    VStack,
    HStack,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import Markdown from 'react-markdown';
import markdownTheme from '../theme/markdownTheme';

interface TransactionModalProps {
    location: "swap" | "launch";
}

export default function TransactionModal({ location }: TransactionModalProps) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [termsOfServiceMarkdown, setRermsOfServiceMarkdown] = useState<string | null>(null);

    const disclaimerText = location === "swap" ? 'I have read and agree to the' : 'I confirm that the above information is correct and that I have read and agree to the';

    useEffect(() => {
        if (isOpen) {
            fetch('/terms-of-service.md')
                .then(response => response.text())
                .then(content => setRermsOfServiceMarkdown(content))
                .catch(error => console.error("Error loading markdown:", error));
        }
    }, [isOpen]);

    return (
        <>
            <HStack fontWeight="bold">
                <Text>{disclaimerText}</Text>
                <Link onClick={onOpen} color="blue">Terms of Service</Link>
            </HStack>
            <Modal size={'5xl'} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent border="1px solid black" borderRadius="16px">
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack alignItems="flex-start" m="5%">
                            <Markdown components={ChakraUIRenderer(markdownTheme)} skipHtml>
                                {termsOfServiceMarkdown}
                            </Markdown>
                            <Button
                                alignSelf="flex-end"
                                onClick={onClose}
                                mt="40px"
                            >
                                Close
                            </Button>
                        </VStack>

                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )
}
