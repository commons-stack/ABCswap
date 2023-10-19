import { CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Text,
    VStack,
    Button,
    Heading
} from '@chakra-ui/react';
import { useCallback, useContext } from 'react';
import { TransactionContext } from '../providers/TransactionProvider';

export default function TransactionModal() {

    const { title, subtitle, isOpen, onClose, steps, activeStep, stepStatus } = useContext(TransactionContext);

    const description = useCallback((index: number) => {
        return stepStatus[index] === 'success' ? 'Success' : stepStatus[index] === 'error' ? 'Error' : stepStatus[index] === 'pending' ? 'Signed' : 'Waiting for signature'
    }, [stepStatus]);

    const isTransactionsEnded = (): boolean => {
        return stepStatus[activeStep] && stepStatus[activeStep] !== 'pending' && stepStatus[activeStep] !== 'notsigned'
    }

    return (
        <Modal size={'5xl'} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent border="1px solid black" borderRadius="16px">
                <ModalCloseButton />
                <ModalBody>
                    <VStack pt="145px" pb="105px">
                        <Heading fontSize="40px" fontWeight={500} color="brand.900">
                            {title.length > 0 ? title : (steps.length > 1 ? 'Confirm Transactions' : 'Confirm Transaction')}
                        </Heading>
                        {subtitle &&
                            <Text fontSize="24px" fontWeight={400} mt="24px" color="brand.900">{subtitle}</Text>
                        }

                        <Stepper size='lg' index={activeStep} mt="42px" minW="520px">
                            {steps?.map((stepInfo, index) => (
                                <Step key={index}>
                                    <VStack >
                                        <StepIndicator w="64px" h="64px" borderWidth={0} style={{ "backgroundColor": (stepStatus[index] === 'error' ? "red" : undefined) }}>
                                            <StepStatus
                                                complete={<StepIcon />}
                                                incomplete={<StepNumber />}
                                                active={stepStatus[index] === 'error' ? <CloseIcon /> : <StepNumber />}
                                            />
                                        </StepIndicator>
                                        <Box flexShrink='0' textAlign={'center'}
                                            textColor={stepStatus[index] === 'error' ? "red" : undefined}>
                                            <StepTitle>{stepInfo.title}</StepTitle>
                                            <StepDescription
                                                style={{ "color": (stepStatus[index] === 'error' ? "red" : undefined) }}
                                            >{description(index)}</StepDescription>
                                        </Box>
                                    </VStack>
                                    <StepSeparator style={{ marginBottom: "50px" }} />
                                </Step>
                            ))}
                        </Stepper>
                        <Button
                            visibility={!isTransactionsEnded() ? "hidden" : "visible"}
                            onClick={onClose}
                            mt="40px"
                        >
                            Close
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
