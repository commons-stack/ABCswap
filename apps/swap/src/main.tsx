import { ChakraProvider } from '@chakra-ui/react';
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "../wagmi";
import App from './App.tsx';
import '../../shared/polyfills.ts';
import Swap from './presentation/pages/swap';
import { TransactionProvider } from '../../shared/presentation/providers/TransactionProvider.tsx';
import theme from '../../shared/presentation/theme/index.ts';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="swap" element={<Swap />} />
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