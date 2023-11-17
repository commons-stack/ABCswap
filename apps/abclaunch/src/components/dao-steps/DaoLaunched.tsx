import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useDaoSwapUrlValue, useDaoUrlValue } from "../../store";

// Navigate can't open a new tab, so we use window.open instead
// https://stackoverflow.com/a/71793248
const goTo = (url: string) => window.open(url, '_blank');

export default function DaoLaunched() {

    const daoUrl = useDaoUrlValue();
    const swapUrl = useDaoSwapUrlValue();

    return (
        <Box pt="75px" pb="75px">
            <VStack spacing={0}>
                <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Congratulations!</Text>
                <Text mt="32px" fontSize="24px" color="brand.900" >Your DAO and ABC were created.</Text>
                <HStack mt="28px" spacing={5}>
                    <Button onClick={() => goTo(swapUrl)}>Go to ABC Swap <ArrowForwardIcon /></Button>
                    <Button onClick={() => goTo(daoUrl)}>Go to my DAO <ArrowForwardIcon/></Button>
                </HStack>
            </VStack>
        </Box>
    );
}
