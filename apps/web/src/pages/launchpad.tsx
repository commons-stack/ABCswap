import { Box, Divider, HStack, Text, VStack, Image } from '@chakra-ui/react';

export default function Launchpad() {
    return (
        <VStack>
            <Text color="brand.900" fontSize="72px" fontFamily="VictorSerifTrial">Welcome to ABC Launchpad!</Text>
            <Text color="brand.900" fontSize="24px">Let's start creating your DAO with Augmented</Text>
            <Text color="brand.900" fontSize="24px">Bonding Curve</Text>
            <Box pt="80px">
                <Divider
                    borderColor="brand.900"
                    borderBottomWidth="1px"
                    width="100%"
                    margin="0 auto"
                />
            </Box>
            <HStack spacing={24}>
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
        </VStack>
    )
}