import React from "react";

import { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  polygonMumbai,
  arbitrumGoerli,
  optimismGoerli,
  arbitrum,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import "../styles/tailwind.scss";
import { moonbase, moonbeam, moonriver } from "../networksInfo";
import { astar } from "../networksInfo";

const { provider, webSocketProvider } = configureChains(
  [
    moonbase,
    moonbeam,
    moonriver,
    mainnet,
    polygon,
    optimism,
    polygonMumbai,
    arbitrumGoerli,
    goerli,
    optimismGoerli,
    arbitrum,
    astar,
  ],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <WagmiConfig client={client}>
      <div className="bg-slate-900 text-white sm:px-4 lg:px-8">
        <Component {...pageProps} />
      </div>
      {/* <Analytics /> */}
    </WagmiConfig>
  );
}

export default MyApp;
