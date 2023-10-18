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
import NewDao from "./pages/NewDao.tsx";
import { RecoilRoot } from "recoil";


const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/new-dao" element={<NewDao />} />
      <Route path="/new-dao/wizard" element={<NewDao />} />
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
            <RecoilRoot>
              <Layout headerLocation="launchpad">
                <RouterProvider router={router} />
              </Layout>
            </RecoilRoot>
          </TransactionProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
);
