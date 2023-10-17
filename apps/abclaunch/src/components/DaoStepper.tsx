import { Box, Button, Flex, HStack, Step, StepIcon, StepIndicator, StepNumber, StepStatus, StepTitle, Stepper, VStack, useSteps } from "@chakra-ui/react";

function Steps({ steps, activeStep }: {steps: {title: string}[], activeStep: number}) {
    return (
        <Stepper size='md' index={activeStep}>
            {steps.map((_, index) => (
                <Step key={index}>
                    <VStack px="10px">
                    <StepIndicator>
                        <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                        />
                    </StepIndicator>
                    <StepTitle>{steps[index].title}</StepTitle>
                    </VStack>
                </Step>
            ))}
        </Stepper>
    )
}

export default function DaoStepper(
    { steps, onComplete, isValid }: {
        steps: {title: string, component: React.ReactElement }[],
        onComplete: () => void,
        isValid: (step: number) => boolean
    }
) {

    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: steps.length,
    })

    const isLastStep = activeStep === steps.length - 1;

    const valid = isValid(activeStep);

    return (
        <Flex justify="center" align="center" height="auto" bg="brand.100" pb="100px">
            <VStack
                bg="brand.300"
                w="90%"
                borderRadius="16px"
                position="relative"
                pt="40px"
            >
                <Box
                    position="absolute"
                    top="-15px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Steps steps={steps} activeStep={activeStep} />
                </Box>

                {steps[activeStep].component}

                <HStack spacing={4} pb="50px" pt="40px">
                    <Button variant="outline" onClick={goToPrevious}>
                        Previous
                    </Button>
                    <Button
                        onClick={isLastStep ? onComplete : goToNext}
                        isDisabled={!valid}>
                        {isLastStep ? 'Launch' : 'Next' }
                    </Button>
                </HStack>
                </VStack>
            </Flex>
    )
}
      