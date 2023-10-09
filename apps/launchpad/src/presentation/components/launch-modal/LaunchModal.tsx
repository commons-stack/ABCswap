import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
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
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';
import { useCallback, useContext } from 'react';
import { TransactionContext } from '../../../../../shared/src/presentation/providers/TransactionProvider';
import useProcessTransactions from '../../../../../shared/src/presentation/hooks/useProcessTransactions';
import useConvertSteps from '../../../../../shared/src/presentation/hooks/useConvertSteps';

export default function TransactionModal() {

    const { isOpen, onClose, steps, activeStep, stepStatus } = useContext(TransactionContext);

    const description = useCallback((index: number) => {
        return stepStatus[index] === 'success' ? 'Success' : stepStatus[index] ==='error' ? 'Error' : stepStatus[index] === 'pending' ? 'Pending...' : 'Not signed'
    }, [stepStatus]);

    return (
        <Modal size={'5xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{steps.length > 1 ? 'Confirm Transactions' : 'Confirm Transaction'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stepper size='lg' colorScheme='blue' index={activeStep}>
                        {steps?.map((stepInfo, index) => (
                            <Step key={index}>
                                    <StepIndicator>
                                        <StepStatus
                                            complete={<StepIcon />}
                                            incomplete={<StepNumber />}
                                            active={stepStatus[index] === 'error' ? <CloseIcon />: <StepNumber />}
                                        />
                                    </StepIndicator>
                                    <Box flexShrink='0'>
                                        <StepTitle>{stepInfo.title}</StepTitle>
                                        <StepDescription>{description(index)}</StepDescription>
                                    </Box>
                                    <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
