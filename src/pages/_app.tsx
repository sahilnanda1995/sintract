import React from "react";

import { AppProps } from "next/app";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import "../styles/tailwind.scss";
import { moonbase, moonbeam, moonriver } from "../networksInfo";

const { provider, webSocketProvider } = configureChains(
  [moonbase, moonbeam, moonriver, mainnet],
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
