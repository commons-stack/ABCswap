import {
    Box,
    Button,
    Step,
    StepDescription,
    StepIndicator,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    VStack,
    useSteps,
} from '@chakra-ui/react'

type TransactionProps = {
    fromAmount: string,
    toAmount: string,
}

export default function Transaction({ fromAmount, toAmount }: TransactionProps) {

    const steps = [
        { title: 'Raise approval', description: 'Waiting for signature' },
        { title: 'Make buy order', description: 'Waiting for signature' },
    ]

    const { activeStep, goToNext } = useSteps({
        index: 0, // Start at the first step
        count: steps.length,
    })

    // Logic to be executed when the user completes the current step
    const handleStepCompletion = () => {
        // Perform your step-specific logic here
        // For example, after successful completion:
        
        // Move to the next step
        goToNext();
    };

    const handleApproval = () => {
        console.log('approval')
    }

    return (
        <>
        <Stepper size='lg' colorScheme='blue' index={activeStep}>
            {steps.map((stepInfo, index) => (
                <Step key={index}>
                    <VStack>

                    
                    <StepIndicator>
                        <StepStatus complete={`✅`} active={`📍`} />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{stepInfo.title}</StepTitle>
                        <StepDescription>{stepInfo.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                    </VStack>
                </Step>
            ))}
        </Stepper>
        {activeStep === 0 && handleApproval()}
        </>
    )
}