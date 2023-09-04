import { Flex, Box } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Header() {
    return(
        <Box>
            <Flex>
                <ConnectButton />
            </Flex>
        </Box>
    )
}