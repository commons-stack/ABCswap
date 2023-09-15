import { Box, VStack, Text, Input, InputGroup, InputRightAddon, Alert, AlertIcon, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface OrganizationNameProps {
    onOrganizationNameChanged: (data: { organizationName: string, completed: boolean }) => void;
}


export default function OrganizationName({ onOrganizationNameChanged }: OrganizationNameProps) {

    const [organizationName, setOrganizationName] = useState<string>('');

    return (
        <Box pt="100px" pb="75px">
            <VStack spacing={0}>
                <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Claim a name</Text>
                <Text fontSize="24px" color="brand.900" pt="32px">Connect your wallet to start creating your DAO</Text>
                <Text fontSize="24px" color="brand.900">with Augmented Bonding Curve</Text>
                <InputGroup pt="48px">
                    <Input
                        placeholder="Type an organization name"
                        value={organizationName ?? ''}
                        onChange={(e) => {
                            setOrganizationName(e.target.value);
                            if(organizationName.length > 0) {
                                onOrganizationNameChanged({ organizationName, completed: true });
                            } else {
                                onOrganizationNameChanged({ organizationName, completed: false });
                            }
                        }}
                    />
                </InputGroup>

            </VStack>
        </Box>
    )

}