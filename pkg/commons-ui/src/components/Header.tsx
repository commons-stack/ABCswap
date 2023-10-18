import { Box, HStack, Text, Link } from "@chakra-ui/react"
import { CustomConnectButton as ConnectButton } from './ConnectButton';

type HeaderProps = {
    headerLocation: "swap" | "launchpad"
}

export default function Header({headerLocation}: HeaderProps) {
    return (
        <Box padding="64px">
            <HStack justifyContent="space-between">
                <Text fontSize="xl"></Text> {/*Left blank to keep content in place till we add logo or text again*/}
                <HStack spacing="32px" justifyContent="space-between">
                <Text fontSize="16px">ABC {headerLocation === 'swap' ? 'Swap' : 'Launchpad'}</Text>
                    <Link href="https://www.commonsstack.org/augmented-bonding-curve" isExternal fontSize="16px">About ABC</Link>
                    <ConnectButton />
                </HStack>
            </HStack>
        </Box>
    )
}