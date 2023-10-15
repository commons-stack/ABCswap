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
    Button
} from '@chakra-ui/react';
import { useCallback, useContext } from 'react';
import { TransactionContext } from '../providers/TransactionProvider';

export default function TransactionModal() {

    const { title, subtitle, isOpen, onClose, steps, activeStep, stepStatus } = useContext(TransactionContext);

    const description = useCallback((index: number) => {
        return stepStatus[index] === 'success' ? 'Success' : stepStatus[index] === 'error' ? 'Error' : stepStatus[index] === 'pending' ? 'Pending...' : 'Not signed'
    }, [stepStatus]);

    const isTransactionsEnded = () : boolean => {
        return stepStatus[activeStep] && stepStatus[activeStep] !== 'pending' && stepStatus[activeStep] !== 'notsigned'
    }

    return (
        <Modal size={'5xl'} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <VStack pt="145px" pb="105px">
                        <Text fontSize="40px" fontWeight={500} color="brand.900" fontFamily="VictorSerifTrial">
                            {title.length > 0 ? title : (steps.length > 1 ? 'Confirm Transactions' : 'Confirm Transaction')}
                        </Text>
                        {subtitle &&
                            <Text fontSize="24px" fontWeight={400} mt="24px">{subtitle}</Text>
                        }

                        <Stepper size='lg' index={activeStep} mt="42px" minW="520px">
                            {steps?.map((stepInfo, index) => (
                                <Step key={index}>
                                    <VStack >
                                        <StepIndicator borderWidth={0} style={{"backgroundColor":(stepStatus[index] === 'error' ? "red" : undefined)}}>
                                            <StepStatus
                                                complete={<StepIcon />}
                                                incomplete={<StepNumber />}
                                                active={stepStatus[index] === 'error' ? <CloseIcon/> : <StepNumber />}
                                            />
                                        </StepIndicator>
                                        <Box flexShrink='0' textAlign={'center'} 
                                            textColor={stepStatus[index] === 'error' ? "red" : undefined}>
                                            <StepTitle>{stepInfo.title}</StepTitle>
                                            <StepDescription
                                                style={{"color":(stepStatus[index] === 'error' ? "red" : undefined)}}
                                            >{description(index)}</StepDescription>
                                        </Box>
                                    </VStack>
                                    <StepSeparator />
                                </Step>
                            ))}
                        </Stepper>
                        <Button
                            visibility={!isTransactionsEnded()?"hidden":"visible"}
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
