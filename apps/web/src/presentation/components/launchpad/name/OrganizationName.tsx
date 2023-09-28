import { Box, InputGroup, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";
import CustomInput from "../../shared/CustomInput";
import CustomInputRightAddon from "../../shared/CustomInputRightAddon";
import { useDAONameModelController } from "./DAONameModelController";

interface OrganizationNameProps {
    onStepCompletionChanged: (completed: boolean) => void;
    daoCreationRepository : DAOCreationRepository;
}

export default function OrganizationName({ onStepCompletionChanged , daoCreationRepository}: OrganizationNameProps) {  
    
    const {
        organizationName,
        handleChangeName,
        userInteracted
     } = useDAONameModelController(daoCreationRepository);

    useEffect(() => {
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
                            handleChangeName(e.target.value);
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
