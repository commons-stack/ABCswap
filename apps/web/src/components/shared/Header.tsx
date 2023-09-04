import { Text, Box, HStack, Image } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Header() {
    return (
        <Box padding="64px">
            <HStack justifyContent="space-between">
                <Image src="../../..//public/HeaderLogo.svg" />
                <HStack spacing="32px" justifyContent="space-between">
                    <Text fontSize="16px">About ABC</Text>
                    <Text fontSize="16px">FAQs</Text>
                    <Text fontSize="16px">ABC Launchpad</Text>
                    <Text fontSize="16px">ABC Swap</Text>
                    <ConnectButton />
                </HStack>
            </HStack>
        </Box>
    )
}