import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { newDaoCreatedUrl } from "../../recoil";

export default function DaoLaunched() {

    const createdDaoUrl = useRecoilValue(newDaoCreatedUrl);

    return (
        <Box pt="100px" pb="75px">
            <VStack spacing={0} className="abcs-newdao-step-content">
                <Text mb="48px" fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Congratulations!</Text>
                <Text>Your DAO and ABC were created.</Text>
                <HStack>
                    <Button variant="outline" onClick={() => window.open("http://localhost:3000", '_blank')}>Go to ABC Swap</Button>
                    <Button variant="outline" onClick={() => window.open(createdDaoUrl, '_blank')}>Go to my DAO</Button>
                </HStack>
            </VStack>
        </Box>
    );
}
