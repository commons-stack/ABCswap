import { Box } from "@chakra-ui/react"
import Header from "./Header"
import Footer from "./Footer"

type LayoutProps = {
    children: React.ReactNode
    variant: "swap" | "launch"
}

export default function Layout({ children, variant }: LayoutProps) {
    return (
        <Box width="100%" height="100vh" bgColor="brand.100">
            <Header variant={variant} />
                {children}
            <Footer />
        </Box>
    )
}