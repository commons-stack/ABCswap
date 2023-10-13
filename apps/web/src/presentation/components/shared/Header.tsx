import { Text, Box, HStack, Image } from "@chakra-ui/react"
import { CustomConnectButton } from "./ConnectButton"

export default function Header() {
    return (
        <Box padding="64px">
            <HStack justifyContent="space-between">
                <Image src="../../..//public/ABCLaunchpadLogo.svg" />
                <HStack spacing="32px" justifyContent="space-between">
                    <Text fontSize="16px">ABC Swap</Text>
                    <Text fontSize="16px">About ABC</Text>
                    <CustomConnectButton />
                </HStack>
            </HStack>
        </Box>
    )
}