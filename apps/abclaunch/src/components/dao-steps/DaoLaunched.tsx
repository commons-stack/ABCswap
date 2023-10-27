import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useDaoUrlValue } from "../../store";

export default function DaoLaunched() {

    const createdDaoUrl = useDaoUrlValue();

    return (
        <Box pt="75px" pb="75px">
            <VStack spacing={0} className="abcs-newdao-step-content">
                <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Congratulations!</Text>
                <Text mt="32px" fontSize="24px" color="brand.900" >Your DAO and ABC were created.</Text>
                <HStack mt="28px" spacing={5}>
                    <Button onClick={() => window.open("https://abcswap.xyz", '_blank')}>Go to ABC Swap <ArrowForwardIcon /></Button>
                    <Button onClick={() => window.open(createdDaoUrl, '_blank')}>Go to my DAO <ArrowForwardIcon/></Button>
                </HStack>
            </VStack>
        </Box>
    );
}
