import { Divider, HStack, Text, VStack, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ChooseOption from '../components/ChooseOption';
import NotOptimizedModal from 'commons-ui/src/components/MobileOptimizationWarningModal';

export default function Launchpad() {
    const navigate = useNavigate();
    return (
        <VStack bg="brand.100" pb="100px">
            <NotOptimizedModal />
            <VStack spacing={0}>
                <Text color="brand.900" fontSize="72px" fontFamily="VictorSerifTrial">Welcome to ABC Launch</Text>
                <Text color="brand.900" fontSize="24px" pt="32px">Build a regenerative economy with an</Text>
                <Text color="brand.900" fontSize="24px">Augmented Bonding Curve.</Text>
                <Divider paddingTop="48px"
                    borderColor="brand.900"
                    borderBottomWidth="1px"
                    width="100%"
                    margin="0 auto"
                />
            </VStack>
            <HStack spacing={20} paddingTop="40px" >
                <HStack>
                    <Image src="/launchpad/ContinuousFunding.svg" />
                    <Text color="brand.900" fontSize="20px" fontWeight="500">Continuous funding</Text>
                </HStack>
                <HStack>
                    <Image src="/launchpad/MarketAccessibility.svg" />
                    <VStack spacing={0}>
                        <Text color="brand.900" fontSize="20px">Market accessibility</Text>
                        <Text color="brand.900" fontSize="20px">& lower volatility</Text>
                    </VStack>
                </HStack>
                <HStack>
                    <Image src="/launchpad/SustainableGrowth.svg" />
                    <Text color="brand.900" fontSize="20px">Sustainable growth</Text>
                </HStack>
            </HStack>
            <HStack spacing={16} pt="46px">
                <ChooseOption
                    title="New DAO"
                    description={[
                        "I want to create a new",
                        "DAO and launch an ABC."
                    ]}
                    onButtonClick={() => navigate('/new-dao')}
                    buttonText="Launch on a new DAO"
                />
                <ChooseOption
                    title="Existing DAO"
                    description={[
                        "I have a DAO and want to",
                        "attach an ABC to it."
                    ]}
                    onButtonClick={() => navigate('/existing-dao')}
                    buttonText="Launch on an existing DAO"
                />
            </HStack>
        </VStack>
    )
}
