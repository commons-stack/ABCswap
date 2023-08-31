import './polyfills.ts'
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "../wagmi";
import theme from './theme.ts';
import App from './App.tsx'
import './index.css'
import Launchpad from './pages/launchpad';
import Swap from './pages/swap';
import { createHashRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Header from './components/shared/Header';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<App />} />
      <Route path="swap" element={<Swap />} />
      <Route path="launchpad" element={<Launchpad />} />
    </Route>
  ));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <RouterProvider router={router} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>,
)
