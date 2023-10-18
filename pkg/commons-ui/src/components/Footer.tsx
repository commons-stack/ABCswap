import { Box, HStack, Image, Text } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box
            width="100%"
            padding="60px"
            bgColor="brand.900"
            textAlign="center"
        >
            <HStack justifyContent="space-between">
                <HStack>
                    <Text fontSize="16px" fontFamily="Victor Serif Trial" color="brand.500">Powered by</Text>
                    <Image src="public/CSLogo.svg" />
                </HStack>
                <Text fontSize="14px" color="brand.500">2023 ABC Labs. All rights reserved.</Text>
            </HStack>
        </Box>
    )
}