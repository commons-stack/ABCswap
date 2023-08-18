import { Flex } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Header() {
    return(
        <>
            <Flex>
                <ConnectButton />
            </Flex>
        </>
    )
}