import { Divider, HStack, Text, VStack, Image, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import './launchpad.css';
import { useNavigate } from 'react-router-dom';

export default function Launchpad() {

    const navigate = useNavigate();

    const handleCreateNewDAOButton = () => {
        navigate('/launchpad/new-dao');
    }

    return (
        <VStack bg="brand.100" pb="100px">
            <VStack spacing={0}>
                <Text color="brand.900" fontSize="72px" fontFamily="VictorSerifTrial">Welcome to ABC Launchpad!</Text>
                <Text color="brand.900" fontSize="24px" pt="32px">Let's start creating your DAO with Augmented</Text>
                <Text color="brand.900" fontSize="24px">Bonding Curve</Text>
                <Divider paddingTop="48px"
                    borderColor="brand.900"
                    borderBottomWidth="1px"
                    width="100%"
                    margin="0 auto"
                />
            </VStack>
            <HStack spacing={20} paddingTop="40px" >
                <HStack>
                    <Image src="../../..//public/launchpad/ContinuousFunding.svg" />
                    <Text color="brand.900" fontSize="18px">Continuous funding</Text>
                </HStack>
                <HStack>
                    <Image src="../../..//public/launchpad/MarketAccessibility.svg" />
                    <VStack spacing={0}>
                        <Text color="brand.900" fontSize="18px">Market accessibility</Text>
                        <Text color="brand.900" fontSize="18px">& lower volatility</Text>
                    </VStack>
                </HStack>
                <HStack>
                    <Image src="../../..//public/launchpad/SustainableGrowth.svg" />
                    <Text color="brand.900" fontSize="18px">Sustainable growth</Text>
                </HStack>
            </HStack>
            <HStack spacing={16} pt="50px">
                <VStack className="option-box" bgColor="white" spacing={0}>
                    <Text color="brand.900" fontSize="40px" fontFamily="VictorSerifTrial">Create a new DAO</Text>
                    <Text color="brand.900" fontSize="20px" mt="34px">I want to create a new DAO with an</Text>
                    <Text color="brand.900" fontSize="20px">Augmented Bonding Curve</Text>
                    <Button mt="34px" onClick={handleCreateNewDAOButton}>Create new DAO <ArrowForwardIcon ml="5px" /></Button>
                </VStack>
                <VStack className="option-box" bgColor="white" spacing={0}>
                    <Text color="brand.900" fontSize="40px" fontFamily="VictorSerifTrial">I already have a DAO</Text>
                    <Text color="brand.900" fontSize="20px" mt="34px">I already have a DAO and I want to</Text>
                    <Text color="brand.900" fontSize="20px">add an Augmented Bonding Curve</Text>
                    <Button mt="34px">Create new DAO <ArrowForwardIcon ml="5px" /></Button>
                </VStack>
            </HStack>
        </VStack>
    )
}