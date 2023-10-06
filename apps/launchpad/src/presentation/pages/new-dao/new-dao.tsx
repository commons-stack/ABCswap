import { Box, HStack, Text, VStack, Image, Button } from '@chakra-ui/react'
import { CustomConnectButtonLong } from '../../../../../shared/presentation/components/ConnectButtonLong'
import DAOLayout from '../../components/DAOLayout'
import { DAOCreationRepository } from '../../../domain/repository/DAOCreationRepository'
import { useNewDaoModelController } from './NewDaoModelController'

interface NewDaoProps {
    daoCreationRepository : DAOCreationRepository;
}

export default function NewDao({daoCreationRepository} : NewDaoProps) {

    const {
        address,
        enoughBalance,
        step,
        steps,
        handleStart,
        nextStep,
        previousStep
    } = useNewDaoModelController({daoCreationRepository});

    if (step !== 0) {
        return (
            <>
                <DAOLayout steps={steps} currentStep={step} onNextStep={nextStep} onPreviousStep={previousStep}/>
            </>
        )
    } else {
        return (
            <>
                <Box bg="brand.100">
                    <VStack spacing={0} pb="117px">
                        <Text fontSize="72px" color="brand.900" fontFamily="VictorSerifTrial">Create a new DAO and</Text>
                        <Text fontSize="72px" color="brand.900" fontFamily="VictorSerifTrial">launch your ABC</Text>
                        <Text fontSize="24px" color="brand.900">... in just a few steps</Text>
                        <HStack pb="32px" pt="56px" spacing={24}>
                            <VStack spacing={0}>
                                <Image src="../../..//public/launchpad/DAOName.svg" pb="16px" />
                                <Text fontSize="24px" color="brand.900">Name your</Text>
                                <Text fontSize="24px" color="brand.900">DAO</Text>
                            </VStack>
                            <VStack spacing={0}>
                                <Image src="../../..//public/launchpad/ConfigureVoting.svg" pb="16px" />
                                <Text fontSize="24px" color="brand.900">Configure</Text>
                                <Text fontSize="24px" color="brand.900">voting</Text>
                            </VStack>
                            <VStack spacing={0}>
                                <Image src="../../..//public/launchpad/ConfigureToken.svg" pb="16px" />
                                <Text fontSize="24px" color="brand.900">Configure</Text>
                                <Text fontSize="24px" color="brand.900">token</Text>
                            </VStack>
                            <VStack spacing={0}>
                                <Image src="../../..//public/launchpad/ConfigureABC.svg" pb="16px" />
                                <Text fontSize="24px" color="brand.900">Configure</Text>
                                <Text fontSize="24px" color="brand.900">ABC</Text>
                            </VStack>
                            <VStack spacing={0}>
                                <Image src="../../..//public/launchpad/LaunchDAO.svg" pb="16px" />
                                <Text fontSize="24px" color="brand.900">Launch</Text>
                                <Text fontSize="24px" color="brand.900">your DAO</Text>
                            </VStack>
                        </HStack>
                        {!enoughBalance &&
                            <HStack mb="28px" mt="93px">
                                <Image src="../../..//public/Error.svg" w="32px" h="32px" mr="8px" />
                                <VStack spacing={0} alignItems="start">
                                    <Text fontSize="16px" color="brand.1200">Insuficient funds, you need</Text>
                                    <Text fontSize="16px" color="brand.1200">more ETH to launch an ABC.</Text>
                                </VStack>
                            </HStack>
                        }
                        {address ? <Button onClick={handleStart} isDisabled={!enoughBalance}>Let's start</Button> : <CustomConnectButtonLong />}
                    </VStack>
                </Box>
            </>
        );
    }
}