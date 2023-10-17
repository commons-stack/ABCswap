import { CheckCircleIcon, CloseIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Button, Divider, HStack, Image, Input, InputGroup, InputRightElement, Spinner, Stack, Text, VStack } from '@chakra-ui/react';
import useDaoIsRegistered from 'dao-utils/src/hooks/useDaoIsRegistered';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';

export default function Home() {
    const [dao, setDao] = useState<string>("");
    const debounceDao = useDebounce(dao, 500);

    const { isRegistered: isDaoRegistered, isError: daoAddressIsError, isLoading: daoAddressIsLoading, isDaoRegistered: getIsDaoRegistered, cleanState } = useDaoIsRegistered();

    const navigate = useNavigate();

    const handleDaoChange = (dao: string) => {
        cleanState();
        setDao(dao);
    }

    useEffect(() => {
        getIsDaoRegistered(debounceDao);
    }, [debounceDao])

    const getDaoNameInputIcon = (): JSX.Element => {
        if (dao.length == 0) return (<></>);
        if (daoAddressIsLoading) return (<Spinner size='xs' />);
        if (daoAddressIsError) return (<WarningTwoIcon color="red.500" />);
        if (isDaoRegistered) return (<CheckCircleIcon color="brand.500" />);
        if (isDaoRegistered == undefined) return (<Spinner size='xs'/>);
        return <WarningTwoIcon color="red.500" />;
    }

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
                <InputGroup mt="55px" w="408px">
                    <Input
                        placeholder="Type an organization name"
                        value={dao ?? ''}
                        autoFocus={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleDaoChange(e.target.value);
                        }}
                        backgroundColor={'white'}
                        errorBorderColor='red.500'
                        borderColor={'black'}
                        isInvalid={!isDaoRegistered}
                        borderRadius="15px"
                        _hover={{ 'color': 'black' }}
                    />
                    <InputRightElement>
                        {
                            getDaoNameInputIcon()
                        }
                    </InputRightElement>
                </InputGroup>
                <HStack spacing={4} mt="40px" visibility={(dao.length == 0 || !daoAddressIsError) ? "collapse" : undefined}>
                    <Stack w="32px" h="32px" alignItems="center" justifyContent="center" borderColor="red.500" borderRadius="16px" borderWidth="2px">
                        <CloseIcon color='red.500' w="16px" h="16px" />
                    </Stack>
                    <Text color="red.500" fontSize="18px">The entered DAO name or contract address was not found.</Text>
                </HStack>
                <Button mt="40px" isDisabled={!isDaoRegistered} w="310px" onClick={() => navigate(`/${dao}`)}>Next</Button>
            </VStack>
        </VStack>
    )
}

