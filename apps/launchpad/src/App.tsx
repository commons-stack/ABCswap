import { Link, useLocation } from "react-router-dom";
import Footer from '../../shared/src/presentation/components/Footer';
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../../shared/src/presentation/components/Header";

export default function App() {

  const location = useLocation();
  const isInitialRoute = location.pathname === "/";

  return (
    <>
      <Box width="100%" height="100vh" bgColor="brand.100">
        <Header />
        {isInitialRoute && (
          <>
            <Link to="/launchpad">Launchpad</Link>
          </>
        )}
        <Outlet />
        <Footer />
      </Box>
    </>
  )
}
