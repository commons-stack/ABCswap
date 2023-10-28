import { Box, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { DaoNameInput } from "dao-utils";
import { useDaoSettingsAtom } from "../../store";

interface OrganizationNameProps {
    title: string,
    isNew?: boolean,
}

export default function OrganizationName({ title, isNew }: OrganizationNameProps) {

    const [organizationSettings, setOrganizationSettings] = useDaoSettingsAtom();
    const { name, daoExists, appIsInstalled } = organizationSettings;

    // If isNew, name must not be registered, otherwise name must be registered but must not have an ABC
    let errorMessage
    if (name.length > 0 && isNew && daoExists) {
        errorMessage = 'The entered DAO name is already registered.'
    } else if (name.length > 0 && !isNew && daoExists === false) {
        errorMessage = 'The entered DAO name was not found.'
    } else if (name.length > 0 && !isNew && daoExists && appIsInstalled) {
        errorMessage = 'The entered DAO name already has an ABC.'
    }

    return (
        <Box pt="100px" pb="40px">
            <VStack spacing={0}>
                <Text mb="48px" fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">{title}</Text>
                <DaoNameInput
                    daoName={name}
                    setDaoName={setOrganizationSettings}
                    isInvalid={!!errorMessage}
                    requiredApp='augmented-bonding-curve.open.aragonpm.eth'
                />
                <HStack spacing={4} h="32px" mt="20px">
                    <HStack visibility={!errorMessage ? "collapse" : undefined}>
                        <Stack h="32px" w="32px" alignItems="center" justifyContent="center" borderColor="red.500" borderRadius="16px" borderWidth="2px">
                            <CloseIcon color='red.500' w="16px" h="16px" />
                        </Stack>
                        <Text color="red.500" fontSize="18px">{errorMessage}</Text>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    );
}
