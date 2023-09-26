import './polyfills.ts'
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "../wagmi";
import theme from './presentation/theme/index.ts';
import App from './App.tsx'
import Launchpad from './presentation/pages/launchpad';
import Swap from './presentation/pages/swap';
import { createHashRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import NewDao from './presentation/pages/new-dao.tsx';
import { TransactionProvider } from './presentation/providers/TransactionProvider.tsx';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="swap" element={<Swap />} />
      <Route path="launchpad" element={<Launchpad />} />
      <Route path="launchpad/new-dao" element={<NewDao />} />
    </Route>
  ));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <TransactionProvider>
            <RouterProvider router={router} />
          </TransactionProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
)