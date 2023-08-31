import { Flex } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Outlet } from "react-router-dom";


export default function Header() {
    return(
        <>
            <Flex>
                <ConnectButton />
            </Flex>
            <Outlet />
        </>
    )
}