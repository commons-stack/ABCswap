import { Box, HStack, Text } from "@chakra-ui/react"
import { CustomConnectButton as ConnectButton } from './ConnectButton';

export default function Header() {
    return (
        <Box padding="64px">
            <HStack justifyContent="space-between">
                <Text fontSize="xl">ABC Swap</Text>
                <HStack spacing="32px" justifyContent="space-between">
                    <Text fontSize="16px">ABC Swap</Text>
                    <Text fontSize="16px">About ABC</Text>
                    <ConnectButton />
                </HStack>
            </HStack>
        </Box>
    )
}