import React, { useEffect, useState } from "react";

import { Contract } from "ethers";
import Head from "next/head";
import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useNetwork,
  useProvider,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import exampleAbi from "../contracts-abi/exampleAbi";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const contractAddress = "0x8529790e3522cD076eEA5B6894bC57E211A8eFAB";
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();

  const contractInstance = useContract({
    address: contractAddress,
    abi: exampleAbi,
    signerOrProvider: signer,
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // for fixing hydration failed error
  if (!hasMounted) {
    return null;
  }

  // console.log("contractInstance");
  // console.log(contractInstance?.address);

  return (
    <div>
      <Head>
        <title>Sintract</title>

        <meta
          name="Sintract: frontend for contract interaction"
          content="Solidity contract interactor"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col py-20">
        <div className="flex-col space-y-4 text-center">
          <h1 className="text-center text-4xl font-bold sm:mt-4 sm:text-6xl">
            Sintract
            <br />
            Solidity Contract Interactor
          </h1>
          <ConnectWallet />
          {/* {isConnected && (
            <div className="flex flex-col space-y-4">
              {chain.id != moonbase.id && <SwitchTo toChain={moonbase} />}
              {chain.id != moonriver.id && <SwitchTo toChain={moonriver} />}
              {chain.id != moonbeam.id && <SwitchTo toChain={moonbeam} />}
            </div>
          )} */}
        </div>
        <div>
          <p>Functions:</p>
        </div>
        <div className="grid flex-1 gap-1">
          {exampleAbi
            .filter((value) => value.type === "function")
            .map((value, index) => {
              return ["payable", "nonpayable"].includes(
                value.stateMutability
              ) ? (
                <CallCardContractWrite
                  abiFnInfo={value}
                  key={index}
                  contractInstance={contractInstance}
                />
              ) : (
                <CallCardContractRead
                  abiFnInfo={value}
                  key={index}
                  contractInstance={contractInstance}
                />
              );
            })}
        </div>
      </main>
    </div>
  );
}

function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return isConnected && chain ? (
    <div>
      <p>Connected to {chain.name}</p>
      <p>Connected Address: {address}</p>
    </div>
  ) : (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
}

function SwitchTo({ toChain }) {
  const { isError, error, switchNetwork } = useSwitchNetwork();

  return isError && error?.name === "ChainNotConfigured" ? (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={() =>
        window.open(
          `https://chainlist.org/chain/${toChain.id}`,
          "_blank",
          "noopener,noreferrer"
        )
      }
    >
      Add network to Metamask
    </button>
  ) : (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={() => switchNetwork(toChain.id)}
    >
      Switch to {toChain.name}
    </button>
  );
}

type ContractReadProps = {
  abiFnInfo: any;
  contractInstance: Contract;
};

function CallCardContractRead({
  abiFnInfo,
  contractInstance,
}: ContractReadProps) {
  const [args, setArgs] = useState(() =>
    Array.apply(null, Array(abiFnInfo?.inputs.length)).map(() => null)
  );

  const [isEnabled, setIsEnabled] = useState(false);

  const handleOnInput = (e, i) => {
    const result = e.target.value.replace(/\D/g, "");
    const newArgs = [...args];
    newArgs[i] = result;
    setArgs(newArgs);
  };

  // function handleOnSubmit() {
  //   setIsEnabled(true);
  // }

  return (
    <div className="space-y-2 rounded-md border border-slate-700 bg-slate-800 p-2">
      <p className="text-lg font-bold text-cyan-400">
        {abiFnInfo.name}{" "}
        {abiFnInfo?.stateMutability && (
          <span className="rounded-lg border border-slate-700 bg-slate-900 p-1 text-sm font-thin text-gray-200">
            {abiFnInfo?.stateMutability}
          </span>
        )}
      </p>
      <div>
        {abiFnInfo?.inputs.length > 0 && <p>args:</p>}
        {abiFnInfo?.inputs.length > 0 && (
          <div className="grid grid-cols-3 gap-2 rounded-lg border border-slate-700 bg-slate-900 p-2">
            {abiFnInfo.inputs.map((arg, argIndex) => (
              <div key={argIndex} className="flex flex-col">
                {arg?.name && <label className="text-xs">{arg?.name}:</label>}
                <input
                  placeholder={arg?.type}
                  onInput={(e) => handleOnInput(e, argIndex)}
                  value={arg[argIndex]}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400
                shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="rounded-md border border-cyan-700 bg-cyan-900 p-2 px-4 text-sm font-medium hover:bg-cyan-600"
        onClick={() => setIsEnabled(true)}
      >
        Submit
      </button>
      {isEnabled && (
        <ContractRead
          args={args}
          contractAddress={contractInstance.address}
          name={abiFnInfo.name}
          setIsEnabled={setIsEnabled}
        />
      )}
    </div>
  );
}

function CallCardContractWrite({
  abiFnInfo,
  contractInstance,
}: ContractReadProps) {
  const [args, setArgs] = useState(() =>
    Array.apply(null, Array(abiFnInfo?.inputs.length)).map(() => null)
  );

  const [isEnabled, setIsEnabled] = useState(false);

  const handleOnInput = (e, i) => {
    const result = e.target.value.replace(/\D/g, "");
    const newArgs = [...args];
    newArgs[i] = result;
    setArgs(newArgs);
  };

  // function handleOnSubmit() {
  //   setIsEnabled(true);
  // }

  return (
    <div className="space-y-2 rounded-md border border-slate-700 bg-slate-800 p-2">
      <p className="text-lg font-bold text-cyan-400">
        {abiFnInfo.name}{" "}
        {abiFnInfo?.stateMutability && (
          <span className="rounded-lg border border-slate-700 bg-slate-900 p-1 text-sm font-thin text-gray-200">
            {abiFnInfo?.stateMutability}
          </span>
        )}
      </p>
      <div>
        {abiFnInfo?.inputs.length > 0 && <p>args:</p>}
        {abiFnInfo?.inputs.length > 0 && (
          <div className="grid grid-cols-3 gap-2 rounded-lg border border-slate-700 bg-slate-900 p-2">
            {abiFnInfo.inputs.map((arg, argIndex) => (
              <div key={argIndex} className="flex flex-col">
                {arg?.name && <label className="text-xs">{arg?.name}:</label>}
                <input
                  placeholder={arg?.type}
                  onInput={(e) => handleOnInput(e, argIndex)}
                  value={arg[argIndex]}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400
                shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="rounded-md border border-cyan-700 bg-cyan-900 p-2 px-4 text-sm font-medium hover:bg-cyan-600"
        onClick={() => setIsEnabled(true)}
      >
        Submit
      </button>
      {isEnabled && (
        <ContractRead
          args={args}
          contractAddress={contractInstance.address}
          name={abiFnInfo.name}
          setIsEnabled={setIsEnabled}
        />
      )}
    </div>
  );
}

function ContractRead({ args, contractAddress, name, setIsEnabled }) {
  useContractRead({
    abi: exampleAbi,
    address: contractAddress,
    functionName: name,
    onSuccess(data) {
      console.log(`${name}: success`);
      console.log(data);
      setIsEnabled(false);
    },
    onError(error) {
      console.error(`${name}: error`);
      console.error("Error", error);
      setIsEnabled(false);
    },
    args: args,
  });

  return null;
}
