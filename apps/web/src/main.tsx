import '../../shared/polyfills.ts'
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "../wagmi";
import theme from '../../shared/presentation/theme/index.ts';
import App from './App.tsx'
import Launchpad from './presentation/pages/launchpad';
import { createHashRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import NewDao from './presentation/pages/new-dao/new-dao.tsx';
import { TransactionProvider } from '../../shared/presentation/providers/TransactionProvider.tsx';
import { DAOCreationWagmiLSRepository } from './data/DAOCreationWagmiLSRepository.ts';

const daoCreationRepository = new DAOCreationWagmiLSRepository();

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="launchpad" element={<Launchpad />} />
      <Route path="launchpad/new-dao" element={<NewDao daoCreationRepository={daoCreationRepository} />} />
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