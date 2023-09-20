import { Box, Button, HStack, VStack, Flex, Image, Text } from "@chakra-ui/react";

type Step = {
    title: string;
    content: JSX.Element;
    index: number;
    completed: boolean;
}

interface DAOLayoutProps {
    steps: Step[];
    currentStep: number;
    onStepChanged: (data: number) => void;
}

export default function DAOLayout({ steps, currentStep, onStepChanged }: DAOLayoutProps) {
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
                    top="-30px"
                    left="10%"
                    right="10%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {steps.slice(1).map((step, index) => (
                        <VStack key={index + 1} spacing={2} alignItems="center">
                            <Box position="relative" width="64px" height="64px">
                                <Image
                                    src="/launchpad/CreamEllipse.png"
                                    alt="First Image"
                                    boxSize="64px"
                                    position="absolute"
                                    zIndex={10}
                                    top="0"
                                    left="0"
                                />
                                {currentStep === index + 1 && (
                                    <Image
                                        src="/launchpad/GreenEllipse.png"
                                        alt="Second Image"
                                        boxSize="48px"
                                        position="absolute"
                                        zIndex={20}
                                        top="50%"
                                        left="50%"
                                        transform="translate(-50%, -50%)"
                                    />
                                )}
                                <Text
                                    fontSize="xl"
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                    zIndex={30}
                                    color={currentStep === index + 1 ? "brand.100" : "inherit"}
                                >
                                    {index + 1}
                                </Text>
                            </Box>
                            <Text fontSize="20px" color="brand.900">{step.title}</Text>
                        </VStack>
                    ))}
                </Box>

                {steps[currentStep].content}

                <HStack spacing={4} pb="50px" pt="40px">
                    <Button onClick={() => onStepChanged(currentStep - 1)} variant="outline">Back</Button>
                    <Button
                        onClick={() => onStepChanged(currentStep + 1)}
                        isDisabled={!steps[currentStep].completed}>
                        Next
                    </Button>
                </HStack>
            </VStack>
        </Flex>
    );
}
