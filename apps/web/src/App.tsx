import { Link } from "react-router-dom";
import Footer from './components/shared/Footer';
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";

export default function App() {

  return (
    <>
      <Box width="100%" height="100vh" bgColor="brand.300">
        <Header />
        <Link to="/swap">Swap</Link>
        <Link to="/launchpad">Launchpad</Link>
        <Footer />
      </Box>
      <Outlet />
    </>
  )
}
