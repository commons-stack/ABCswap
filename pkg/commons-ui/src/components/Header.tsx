import { Box, HStack, Text, Link } from "@chakra-ui/react"
import { CustomConnectButton as ConnectButton } from './ConnectButton';

type HeaderProps = {
    variant: "swap" | "launch"
}

export default function Header({ variant }: HeaderProps) {

    const swapOrLaunchLink = variant === "launch" ? "https://abcswap.xyz/" : "https://launch.abcswap.xyz/";

    return (
        <Box padding="64px">
            <HStack justifyContent="space-between">
                <Text fontSize="xl"></Text> {/*Left blank to keep content in place till we add logo or text again*/}
                <HStack spacing="32px" justifyContent="space-between">
                    <Link
                        href={swapOrLaunchLink}
                        fontSize="16px"
                        isExternal
                    >ABC {variant === 'launch' ? 'Swap' : 'Launch'}
                    </Link>
                    <Link href="https://www.commonsstack.org/augmented-bonding-curve" isExternal fontSize="16px">About ABC</Link>
                    <ConnectButton />
                </HStack>
            </HStack>
        </Box>
    )
}