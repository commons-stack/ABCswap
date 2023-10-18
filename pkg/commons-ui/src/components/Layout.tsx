import { Box } from "@chakra-ui/react"
import Header from "./Header"
import Footer from "./Footer"

type LayoutProps = {
    children: React.ReactNode
    headerLocation: "swap" | "launchpad"
}

export default function Layout({ children, headerLocation }: LayoutProps) {
    return (
        <Box width="100%" height="100vh" bgColor="brand.100">
            <Header headerLocation={headerLocation} />
                {children}
            <Footer />
        </Box>
    )
}