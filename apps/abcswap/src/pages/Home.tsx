import { CloseIcon } from '@chakra-ui/icons';
import { Button, Divider, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DaoNameInput, useIsRegisteredDao } from 'dao-utils';

export default function Home() {

    const navigate = useNavigate();

    const [daoName, setDaoName] = useState('');
    const { isRegistered, error } = useIsRegisteredDao(daoName, 500);

    return (
        <VStack bg="brand.100" pb="100px">
            <VStack spacing={0}>
                <Text color="brand.900" fontSize="72px" fontFamily="VictorSerifTrial">Welcome to ABC Swap</Text>
                <Text color="brand.900" fontSize="24px" pt="32px">Where you can find and swap you</Text>
                <Text color="brand.900" fontSize="24px">favorite DAO's ABC tokens.</Text>
                <Divider paddingTop="48px"
                    borderColor="brand.900"
                    borderBottomWidth="1px"
                    width="100%"
                    margin="0 auto"
                />
            </VStack>
            <HStack spacing={20} paddingTop="40px" >
                <HStack>
                    <Image src="/swap-home/ContinuousFunding.svg" />
                    <Text color="brand.900" fontSize="20px" fontWeight="500">Continuous funding</Text>
                </HStack>
                <HStack>
                    <Image src="/swap-home/MarketAccessibility.svg" />
                    <VStack spacing={0}>
                        <Text color="brand.900" fontSize="20px">Market accessibility</Text>
                        <Text color="brand.900" fontSize="20px">& lower volatility</Text>
                    </VStack>
                </HStack>
                <HStack>
                    <Image src="/swap-home/SustainableGrowth.svg" />
                    <Text color="brand.900" fontSize="20px">Sustainable growth</Text>
                </HStack>
            </HStack>
            <VStack spacing={4} mt="100px" >
                <Text color="brand.900" fontSize="40px" fontFamily="VictorSerifTrial">Which token do you want to swap?</Text>
                <DaoNameInput daoName={daoName} setDaoName={setDaoName} />
                <HStack spacing={4} mt="40px" visibility={(daoName.length == 0 || !error) ? "collapse" : undefined}>
                    <Stack w="32px" h="32px" alignItems="center" justifyContent="center" borderColor="red.500" borderRadius="16px" borderWidth="2px">
                        <CloseIcon color='red.500' w="16px" h="16px" />
                    </Stack>
                    <Text color="red.500" fontSize="18px">The entered DAO name or contract address was not found.</Text>
                </HStack>
                <Button mt="40px" isDisabled={!isRegistered} w="310px" onClick={() => navigate(`/${daoName}`)}>Next</Button>
            </VStack>
        </VStack>
    )
}

