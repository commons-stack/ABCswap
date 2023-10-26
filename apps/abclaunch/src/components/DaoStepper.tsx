import { Box, Button, Flex, HStack, Step, StepIcon, StepIndicator, StepNumber, StepStatus, StepTitle, Stepper, VStack, useSteps } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Steps({ steps, activeStep }: { steps: { title: string }[], activeStep: number }) {
    return (
        <Stepper size='md' index={activeStep}>
            {steps.map((_, index) => (
                <Step key={index}>
                    <VStack px="25px">
                        <StepIndicator w="70px" h="70px">
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
    { steps, onComplete, isValid, blockingComponent }: {
        steps: { title: string, component: React.ReactElement }[],
        onComplete: () => void,
        isValid: (step: number) => boolean,
        blockingComponent?: React.ReactElement
    }
) {

    const navigate = useNavigate();

    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 2,
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
                    top="-32px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Steps steps={steps} activeStep={activeStep} />
                </Box>
                {
                    blockingComponent ??
                    <>
                        {
                            steps[activeStep].component
                        }

                        <HStack spacing={4} pb="50px" pt="40px">
                            <Button variant="outline" onClick={activeStep === 0 ? () => navigate(-1) : goToPrevious}>
                                Previous
                            </Button>
                            <Button
                                onClick={isLastStep ? onComplete : goToNext}
                                isDisabled={!valid}>
                                {isLastStep ? 'Launch' : 'Next'}
                            </Button>
                        </HStack>
                    </>
                }
            </VStack>
        </Flex>
    )
}
