import { Box, VStack, Text, Input, InputGroup, InputRightAddon, Alert, AlertIcon, HStack } from "@chakra-ui/react";
import { useState } from "react";

interface OrganizationNameProps {
    onOrganizationNameChanged: (data: string) => void;
}

export default function OrganizationName({onOrganizationNameChanged}: OrganizationNameProps) {

    const [organizationName, setOrganizationName] = useState<string>('');

    return(
        <main>
            <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg" width="50vw">
                <VStack spacing={4}>
                    <Text fontSize="xl" as="b" p="1rem" textAlign="center">Claim a name</Text>
                    <InputGroup>
                        <Input placeholder="Type an organization name" value={organizationName ?? ''} onChange={(e) => {
                            onOrganizationNameChanged(e.target.value)
                            setOrganizationName(e.target.value)
                        }} />
                        <InputRightAddon children='.aragonid.eth' />
                    </InputGroup>
                    <Alert status="info" p="1rem">
                        <AlertIcon/>
                        <Text fontSize="xs" as="em">Aragon uses the Ethereum Name Service (ENS) to assign names to organizations. The name you choose will be mapped to your organization’s Ethereum address and cannot be changed after you launch your organization.
                        </Text>
                    </Alert>
                    <HStack>
                    </HStack>
                </VStack>
            </Box>
        </main>
    )

}