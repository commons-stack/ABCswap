import { Box, InputGroup, Input, InputRightAddon, Text, VStack } from "@chakra-ui/react";
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { newDaoNameState } from "../../recoil";
import { useRecoilState } from "recoil";

export default function OrganizationName() { 

    const [organizationName, setOrganizationName] = useRecoilState(newDaoNameState);

    function handleNameChange(name: string) {
        /[a-z0-9]*/.test(name) && setOrganizationName(name);
    }

    return (
        <Box pt="100px" pb="75px">
            <VStack spacing={0} className="abcs-newdao-step-content">
                <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Name your DAO</Text>
                <InputGroup mt="48px">
                    <Input
                        placeholder="Type an organization name"
                        value={organizationName ?? ''}
                        onChange={(e) => handleNameChange(e.target.value)}
                    />
                    <InputRightAddon>
                        {(organizationName.length > 0 ? <CheckCircleIcon color="brand.500" /> : <WarningTwoIcon color="red.500" />)}
                    </InputRightAddon>
                </InputGroup>
            </VStack>
        </Box>
    );
}
