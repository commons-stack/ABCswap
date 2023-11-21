import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    useDisclosure,
    useBreakpointValue,
    VStack
} from "@chakra-ui/react"
import { useEffect } from "react"


export default function MobileOptimizationWarningModal() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const isMobile = useBreakpointValue({ base: true, md: false })

    useEffect(() => {
        if (isMobile) {
            onOpen();
        }
    }, [isMobile, onOpen])

    if (!isMobile) return (<></>)

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent border="1px solid black" borderRadius="16px">
                    <ModalHeader>Attention!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign="center" m="2.5%">
                        <VStack>
                            <Text>This MVP is not yet optimized for mobile. It is best experienced on a desktop.</Text>
                            <Button onClick={onClose}>Ok</Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}