import { Box, Text, VStack } from "@chakra-ui/react";
import { DaoNameInput } from "dao-utils";
import { useDaoSettingsAtom } from "../../store";

interface OrganizationNameProps {
    title: string,
}

export default function OrganizationName({ title }: OrganizationNameProps) { 

    const [organizationSettings, setOrganizationSettings] = useDaoSettingsAtom();

    return (
        <Box pt="100px" pb="75px">
            <VStack spacing={0}>
                <Text mb="48px" fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">{title}</Text>
                <DaoNameInput
                    daoName={organizationSettings.name}
                    setDaoName={setOrganizationSettings}
                    inverted
                />
            </VStack>
        </Box>
    );
}
