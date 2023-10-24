import { CloseIcon } from '@chakra-ui/icons';
import { Button, Divider, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DaoNameInput, useIsRegisteredDaoWithApp } from 'dao-utils';
import { DAONotFoundError } from 'dao-utils/src/hooks/useDao';

export default function Home() {

    const navigate = useNavigate();

    const [daoName, setDaoName] = useState('');
    const { isRegistered, isLoading, error } = useIsRegisteredDaoWithApp(daoName, 'augmented-bonding-curve.open.aragonpm.eth');
    const daoExists = !error || !(error instanceof DAONotFoundError);

    return (
        <VStack bg="brand.100" pb="100px0" textAlign="center">
            <VStack spacing={0}>
                <Text color="brand.900" fontSize="72px" fontFamily="VictorSerifTrial">Welcome to ABC Swap</Text>
                <Text color="brand.900" fontSize="24px" pt="32px">Find and swap ABC tokens.</Text>
                <Divider paddingTop="48px"
                    borderColor="brand.900"
                    borderBottomWidth="1px"
                    width="100%"
                    margin="0 auto"
                />
            </VStack>
            <HStack spacing={20} paddingTop="40px" >
                <VStack>
                    <Image src="/swap-home/ContinuousFunding.svg" />
                    <Text color="brand.900" fontSize="20px" fontWeight="500">Continuous funding</Text>
                </VStack>
                <VStack>
                    <Image src="/swap-home/MarketAccessibility.svg" />
                    <VStack spacing={0}>
                        <Text color="brand.900" fontSize="20px">Market accessibility</Text>
                        <Text color="brand.900" fontSize="20px">& lower volatility</Text>
                    </VStack>
                </VStack>
                <VStack>
                    <Image src="/swap-home/SustainableGrowth.svg" />
                    <Text color="brand.900" fontSize="20px">Sustainable growth</Text>
                </VStack>
            </HStack>
            <VStack spacing={4} mt="100px" mb="100px" textAlign="center" >
                <Text color="brand.900" fontSize="40px" fontFamily="VictorSerifTrial">Which token do you want to swap?</Text>
                <DaoNameInput daoName={daoName} setDaoName={({name}) => setDaoName(name)} requiredApp='augmented-bonding-curve.open.aragonpm.eth' />
                <HStack spacing={4} h="32px">
                    <HStack visibility={(daoName.length == 0 || isRegistered || isLoading) ? "collapse" : undefined}>
                        <Stack h="32px" w="32px" alignItems="center" justifyContent="center" borderColor="red.500" borderRadius="16px" borderWidth="2px">
                            <CloseIcon color='red.500' w="16px" h="16px" />
                        </Stack>
                        <Text color="red.500" fontSize="18px">{!daoExists ? 'The entered DAO name or contract address was not found.' : 'The entered DAO name or address does not have an ABC.'}</Text>
                    </HStack>
                </HStack>
                <Button isDisabled={!isRegistered} w="310px" onClick={() => navigate(`/${daoName}`)}>Next</Button>
            </VStack>
        </VStack>
    )
}

