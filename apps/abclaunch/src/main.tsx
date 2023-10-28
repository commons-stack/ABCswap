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
import ExistingDao from "./pages/ExistingDao.tsx";


const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/new-dao" element={<NewDao isInsideWizard={false}/>} />
      <Route path="/new-dao/wizard" element={<NewDao isInsideWizard={true} />} />
      <Route path="/existing-dao/" element={<ExistingDao isInsideWizard={false}/>} />
      <Route path="/existing-dao/wizard" element={<ExistingDao isInsideWizard={true} />} />
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
            <Layout variant="launch">
              <RouterProvider router={router} />
            </Layout>
          </TransactionProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
);
