import { Box } from "@chakra-ui/react"
import Header from "./Header"
import Footer from "./Footer"

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <Box width="100%" height="100vh" bgColor="brand.100">
            <Header />
                {children}
            <Footer />
        </Box>
    )
}