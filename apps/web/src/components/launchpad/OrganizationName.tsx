import { Box, VStack, Text, InputGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomInput from "../shared/CustomInput";
import CustomInputRightAddon from "../shared/CustomInputRightAddon";

interface OrganizationNameProps {
    onStepCompletionChanged: (completed: boolean) => void;
}

export default function OrganizationName({ onStepCompletionChanged }: OrganizationNameProps) {
    const [organizationName, setOrganizationName] = useState<string>('');
    const [userInteracted, setUserInteracted] = useState<boolean>(false);

    useEffect(() => {
        const storedOrganizationName = localStorage.getItem('organizationName');
        if (storedOrganizationName) {
            setOrganizationName(storedOrganizationName);
            setUserInteracted(true);
        }
    }, []);    

    useEffect(() => {
        localStorage.setItem('organizationName', organizationName);
        const isCompleted = organizationName.length > 0;        
        if (onStepCompletionChanged) {
            onStepCompletionChanged(isCompleted);
        }
    }, [organizationName]);

    return (
        <Box pt="100px" pb="75px">
            <VStack spacing={0}>
                <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Name your DAO</Text>
                <InputGroup mt="48px">
                    <CustomInput 
                        rightAddon={true}
                        placeholder="Type an organization name"
                        value={organizationName ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setOrganizationName(e.target.value);
                            setUserInteracted(true);
                        }}
                    />
                    <CustomInputRightAddon>
                        {userInteracted ? (organizationName.length > 0 ? "Completed" : "Not Completed") : ""}
                    </CustomInputRightAddon>
                </InputGroup>
            </VStack>
        </Box>
    );
}
