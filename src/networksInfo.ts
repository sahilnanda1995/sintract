import { Chain } from "wagmi";

export const moonbase: Chain = {
  id: 1287,
  name: "Moonbase Alpha",
  network: "Moonbase Alpha",
  nativeCurrency: {
    decimals: 18,
    name: "Moonbase Alpha",
    symbol: "DEV",
  },
  rpcUrls: {
    default: {
      http: ["https://moonbeam-alpha.api.onfinality.io/public"],
      webSocket: ["wss://wss.api.moonbase.moonbeam.network"],
    },
    onfinality: {
      http: ["https://moonbeam-alpha.api.onfinality.io/public"],
      webSocket: ["wss://moonbeam-alpha.api.onfinality.io/public-ws"],
    },
  },
  blockExplorers: {
    default: { name: "Moonscan", url: "https://moonbase.moonscan.io" },
    subscan: { name: "Subscan", url: "https://moonbase.subscan.io/" },
  },
};

export const moonriver: Chain = {
  id: 1285,
  name: "Moonriver",
  network: "Moonriver",
  nativeCurrency: {
    decimals: 18,
    name: "Moonriver",
    symbol: "MOVR",
  },
  rpcUrls: {
    default: {
      http: ["https://moonriver.api.onfinality.io/public"],
      webSocket: ["wss://moonriver.api.onfinality.io/public-ws"],
    },
    onfinality: {
      http: ["https://moonriver.api.onfinality.io/public"],
      webSocket: ["wss://moonriver.api.onfinality.io/public-ws"],
    },
  },
  blockExplorers: {
    default: { name: "Moonscan", url: "https://moonriver.moonscan.io" },
    subscan: { name: "Subscan", url: "https://moonriver.subscan.io/" },
  },
};

export const moonbeam: Chain = {
  id: 1284,
  name: "Moonbeam",
  network: "Moonbeam",
  nativeCurrency: {
    decimals: 18,
    name: "Glimmer",
    symbol: "GLMR",
  },
  rpcUrls: {
    default: {
      http: ["https://moonbeam.api.onfinality.io/public"],
      webSocket: ["wss://moonbeam.api.onfinality.io/public-ws"],
    },
    onfinality: {
      http: ["https://moonbeam.api.onfinality.io/public"],
      webSocket: ["wss://moonbeam.api.onfinality.io/public-ws"],
    },
  },
  blockExplorers: {
    default: { name: "Moonscan", url: "https://moonbeam.moonscan.io" },
    subscan: { name: "Subscan", url: "https://moonbeam.subscan.io/" },
  },
};
