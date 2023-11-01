import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from "react-router-dom";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig } from "wagmi";
import { Layout, theme } from "commons-ui"
import { TransactionProvider } from "transactions-modal";
import { chains, wagmiConfig } from "./wagmi.ts";
import Home from "./pages/Home.tsx";
import Swap from "./pages/Swap.tsx";
import LegalPage from "./pages/LegalPage.tsx";
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from "./constants.ts";

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/:dao" element={<Swap />} errorElement={<div>Something went wrong</div>} />
      <Route path="/privacy" element={<LegalPage src={PRIVACY_POLICY} />} />
      <Route path="/terms" element={<LegalPage src={TERMS_OF_SERVICE} />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <TransactionProvider>
            <Layout variant="swap">
              <RouterProvider router={router} />
            </Layout>
          </TransactionProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
);
