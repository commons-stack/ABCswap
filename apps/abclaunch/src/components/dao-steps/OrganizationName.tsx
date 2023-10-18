import { Box, Text, VStack } from "@chakra-ui/react";
import { newDaoNameState } from "../../recoil";
import { DaoNameInput } from "dao-utils";
import { useRecoilState } from "recoil";

export default function OrganizationName() { 

    const [organizationSettings, setOrganizationSettings] = useRecoilState(newDaoNameState);

    return (
        <Box pt="100px" pb="75px">
            <VStack spacing={0} className="abcs-newdao-step-content">
                <Text mb="48px" fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Name your DAO</Text>
                <DaoNameInput
                    daoName={organizationSettings.name}
                    setDaoName={setOrganizationSettings}
                    inverted
                />
            </VStack>
        </Box>
    );
}
