import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { CustomConnectButton } from 'commons-ui/src/components/ConnectButton';
import React from 'react';
import { parseEther } from 'viem';
import { useAccount, useBalance } from 'wagmi';


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

type StepInfo = {
    image: string;
    description: string[];
}[]

interface WizardHomeProps {
    title: string[];
    subtitle: string[];
    stepsInfo: StepInfo;
    onButtonClick: () => void;
}

export default function WizardHome({ title, subtitle, stepsInfo, onButtonClick }: WizardHomeProps) {

    const { address } = useAccount();
    const { data: balance } = useBalance({ address, watch: true });

    const enoughBalance = balance && balance.value > parseEther("100", "gwei");

    function getTitle(): JSX.Element[] {
        return title.map((text, index) => {
            return <Text key={index} color="brand.900" fontSize="72px" fontFamily="VictorSerifTrial">{text}</Text>
        })
    }

    function getSubtitle(): JSX.Element[] { 
        return subtitle.map((text, index) => {
            return <Text key={index} color="brand.900" fontSize="24px">{text}</Text>
        })
    }

    function getStepsInfo(): JSX.Element[] {
        return stepsInfo.map((step, index) => {
            return <StepInfo key={index} image={step.image}>{step.description.map(
                (text, index) => <Text key={index} color="brand.900">{text}</Text>
            )}</StepInfo>
        })
    }

    return (
        <>
            <Box bg="brand.100">
                <VStack spacing={0} pb="117px">
                    {getTitle()}
                    {getSubtitle()}
                    <HStack pb="32px" pt="56px" spacing={24}>
                        {getStepsInfo()}
                    </HStack>
                    {!address &&
                        <Error>Connect your account before proceeding.</Error>
                    }
                    {address && !enoughBalance &&
                        <Error>Insuficient funds, you need <br /> more ETH to launch an ABC.</Error>
                    }
                    {address ? <Button onClick={onButtonClick} isDisabled={!enoughBalance}>Let's start</Button> : <CustomConnectButton />}
                </VStack>
            </Box>
        </>
    );
}