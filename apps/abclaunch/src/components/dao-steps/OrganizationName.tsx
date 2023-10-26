import { Box, Text, VStack } from "@chakra-ui/react";
import { newDaoNameState } from "../../recoil";
import { DaoNameInput } from "dao-utils";
import { useRecoilState } from "recoil";

interface OrganizationNameProps {
    title: string
}

export default function OrganizationName({ title }: OrganizationNameProps) { 

    const [organizationSettings, setOrganizationSettings] = useRecoilState(newDaoNameState);

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
