import { Box } from "@chakra-ui/react";
//import SubscribeButton from "./footer/SubscribeButton";
//import SubscribeInput from "./footer/SubscribeInput";

export default function Footer() {
    return (
        <Box
            width="100%"
            padding="80px"
            bgColor="brand.900"
            textAlign="center"
        >
            {/*<HStack>*/}
                {/*<VStack flex="auto" alignItems="baseline" spacing={0}>
                    <Text color="brand.500" fontSize="18px" fontWeight="600">Join our newsletter</Text>
                    <Text color="brand.500" fontSize="16px">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                </VStack>
                <HStack>
                    <VStack>
                        <HStack>
                            <SubscribeInput placeholder="Enter your email" />
                            <SubscribeButton>Subscribe</SubscribeButton>
                        </HStack>
                        <Text color="brand.500" fontSize="12px" alignSelf="baseline">By subscribing you agree to with our privacy policy</Text>
                    </VStack>
    </HStack>*/}
            {/*</HStack>
            <Box pt="80px">
                <Divider
                    borderColor="brand.500"
                    borderBottomWidth="1px"
                    width="100%"
                    margin="0 auto"
                />
</Box>*/}
            {/*<HStack justifyContent="space-between" pt="32px">
                <Text color="brand.500" fontSize="14px">2023 Commons Stack. All rights reserved.</Text>
            </HStack>*/}
        </Box>
    )
}