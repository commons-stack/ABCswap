import { Divider, HStack, Text, VStack, Image, Button, InputGroup } from '@chakra-ui/react';
import { useState } from 'react';
import CustomInput from '../shared/CustomInput';
import CustomInputRightAddon from '../shared/CustomInputRightAddon';

interface SwapHomeProps {
    onNextButtonClick: (clicked: boolean) => void;
}

export default function SwapHome({onNextButtonClick}: SwapHomeProps) {

    const [dao, setDao] = useState<string>("");
    const [userInteracted, setUserInteracted] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);

    const handleDaoChange = (dao: string) => {
        setUserInteracted(true);
        setDao(dao);
        // Verify if the name is valid

        setCompleted(true);
    }

    return (
        <VStack bg="brand.100" pb="100px">
            <VStack spacing={0}>
                <Text color="brand.900" fontSize="72px" fontFamily="VictorSerifTrial">Welcome to ABC Swap</Text>
                <Text color="brand.900" fontSize="24px" pt="32px">Lorem ipsum</Text>
                <Text color="brand.900" fontSize="24px">sit amet.</Text>
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
                    <Text color="brand.900" fontSize="20px" fontWeight="500">Continuous funding</Text>
                </HStack>
                <HStack>
                    <Image src="../../..//public/launchpad/MarketAccessibility.svg" />
                    <VStack spacing={0}>
                        <Text color="brand.900" fontSize="20px">Market accessibility</Text>
                        <Text color="brand.900" fontSize="20px">& lower volatility</Text>
                    </VStack>
                </HStack>
                <HStack>
                    <Image src="../../..//public/launchpad/SustainableGrowth.svg" />
                    <Text color="brand.900" fontSize="20px">Sustainable growth</Text>
                </HStack>
            </HStack>
            <VStack spacing={4} mt="100px" >
                <Text color="brand.900" fontSize="40px" fontFamily="VictorSerifTrial">Select your DAO</Text>
                <InputGroup mt="55px">
                    <CustomInput 
                        w="408px"
                        rightAddon={true}
                        placeholder="Type an organization name"
                        value={dao ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleDaoChange(e.target.value);
                        }}
                    />
                    <CustomInputRightAddon>
                        {userInteracted ? (dao.length > 0 ? <Image src="../../../../public/Check.svg" boxSize="24px" /> : <Image src="../../../../public/Error.svg" boxSize="24px" />) : ""}
                    </CustomInputRightAddon>
                </InputGroup>
                <Button mt="40px" onClick={() => onNextButtonClick(true)} disabled={!completed} w="310px">Next</Button>
            </VStack>
        </VStack>
    )
}