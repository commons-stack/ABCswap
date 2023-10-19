import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { CustomConnectButton } from 'commons-ui/src/components/ConnectButton';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useProcessTransactions } from 'transactions-modal';
import { parseEther } from 'viem';
import { useAccount, useBalance } from 'wagmi';
import DaoStepper from '../components/DaoStepper';
import ConfigureAbc from '../components/dao-steps/ConfigureAbc';
import ConfigureToken from '../components/dao-steps/ConfigureToken';
import ConfigureVoting from '../components/dao-steps/ConfigureVoting';
import DaoLaunched from '../components/dao-steps/DaoLaunched';
import OrganizationName from '../components/dao-steps/OrganizationName';
import Summary from '../components/dao-steps/Summary';
import useIsValid from '../hooks/useIsValid';
import useLaunchSteps from '../hooks/useLaunchSteps';
import { newDaoCreatedIsValid, newDaoCreatedState, newDaoNameState } from '../recoil';

function Error({ children }: { children: React.ReactNode }) {
    return (
        <HStack mb="28px" mt="93px">
            <WarningTwoIcon w="32px" h="32px" mr="8px" color="brand.1200" />
            <VStack spacing={0} alignItems="start">
                <Text fontSize="16px" color="brand.1200">{children}</Text>
            </VStack>
        </HStack>
    )
}

function StepInfo({ image, children }: { image: string, children: React.ReactNode }) {
    return (
        <VStack spacing={0}>
            <Image src={image} pb="16px" />
            <Text fontSize="24px" color="brand.900" textAlign="center">{children}</Text>
        </VStack>
    )
}

export default function NewDao() {

    const { address } = useAccount();
    const { data: balance } = useBalance({ address });
    const navigate = useNavigate();
    const location = useLocation();
    const txSteps = useLaunchSteps();
    const { processTransactions } = useProcessTransactions()

    const enoughBalance = balance && balance.value > parseEther("100", "gwei");

    const isValid = useIsValid()

    const setNewDaoCreated = useSetRecoilState(newDaoCreatedState)
    const daoName = useRecoilValue(newDaoNameState)
    const newDaoHasBeenCreated = useRecoilValue(newDaoCreatedIsValid);

    const steps = [
        { title: 'Name your DAO', component: <OrganizationName /> },
        { title: 'Configure voting', component: <ConfigureVoting /> },
        { title: 'Configure token', component: <ConfigureToken /> },
        { title: 'Configure ABC', component: <ConfigureAbc /> },
        { title: 'Launch your DAO', component: <Summary /> },
    ];

    if (location.pathname === '/new-dao/wizard') {
        return (
            <DaoStepper
                steps={steps}
                isValid={isValid}
                onComplete={() => processTransactions("Launch your DAO", undefined, txSteps, true, undefined, () => {
                    setNewDaoCreated({name:daoName.name})
                })}
                blockingComponent={newDaoHasBeenCreated ? <DaoLaunched /> : undefined}
            />
        )
    }
    return (
        <>
            <Box bg="brand.100">
                <VStack spacing={0} pb="117px">
                    <Text fontSize="72px" color="brand.900" fontFamily="VictorSerifTrial">Create a new DAO and</Text>
                    <Text fontSize="72px" color="brand.900" fontFamily="VictorSerifTrial">launch your ABC</Text>
                    <Text fontSize="24px" color="brand.900">... in just a few steps</Text>
                    <HStack pb="32px" pt="56px" spacing={24}>
                        <StepInfo image="/launchpad/DAOName.svg">Name your <br /> DAO</StepInfo>
                        <StepInfo image="/launchpad/ConfigureVoting.svg">Configure <br /> voting</StepInfo>
                        <StepInfo image="/launchpad/ConfigureToken.svg">Configure <br /> token</StepInfo>
                        <StepInfo image="/launchpad/ConfigureABC.svg">Configure <br /> ABC</StepInfo>
                        <StepInfo image="/launchpad/LaunchDAO.svg">Launch <br /> your DAO</StepInfo>
                    </HStack>
                    {!address &&
                        <Error>Connect your account before proceeding.</Error>
                    }
                    {address && !enoughBalance &&
                        <Error>Insuficient funds, you need <br /> more ETH to launch an ABC.</Error>
                    }
                    {address ? <Button onClick={() => navigate('/new-dao/wizard')} isDisabled={!enoughBalance}>Let's start</Button> : <CustomConnectButton />}
                </VStack>
            </Box>
        </>
    );
}