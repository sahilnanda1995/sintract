import React, { useEffect, useState } from "react";

import { PencilSquareIcon, WalletIcon } from "@heroicons/react/20/solid";
import { Contract, ethers } from "ethers";
import Head from "next/head";
import { useLocalStorage } from "usehooks-ts";
import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import ModalContractInput from "../components/ModalContractInfo";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const [contractAddr, setContractAddr] = useState<undefined | string>();
  const [contractABI, setContractABI] = useState<any>();
  const [savedContractInfo, setSavedContractInfo] = useLocalStorage(
    "contract",
    ""
  );
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  // const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const contractInstance = useContract({
    address: contractAddr,
    abi: contractABI,
    signerOrProvider: signer,
  });

  const [inputAddr, setInputAddr] = useState("");
  const [inputABI, setInputABI] = useState("");

  const handleOnContractInfo = () => {
    setOpen(true);
  };

  const handleOnAddrInput = (e) => {
    const input = e?.target?.value;
    setInputAddr(input);
  };

  const handleOnABIInput = (e) => {
    const input = e?.target?.value;
    setInputABI(input);
  };

  const handleOnSave = () => {
    setContractAddr(inputAddr);
    setContractABI(JSON.parse(inputABI));
    setSavedContractInfo(JSON.stringify({ addr: inputAddr, abi: inputABI }));
    setOpen(false);
  };

  const handleOnCancel = () => {
    // setContractAddr(inputAddr);
    // setContractABI(JSON.parse(JSON.stringify(inputABI)));
    // setInputAddr("");
    // setInputABI("");
    setOpen(false);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (savedContractInfo !== undefined || savedContractInfo !== "") {
      const info = JSON.parse(JSON.stringify(savedContractInfo));
      setContractAddr(info?.addr);
      setContractABI(info?.abi);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   async function getContractCode() {
  //     const code = await provider.getCode(contractAddr);
  //     console.log("contract code");
  //     console.log(code);
  //   }
  //   if (provider && contractAddr) {
  //     getContractCode();
  //   }
  // }, [contractAddr, provider]);

  // useEffect(() => {
  //   setContractABI(exampleAbi);
  // }, []);

  // for fixing hydration failed error
  if (!hasMounted) {
    return null;
  }

  // console.log("contractABI");
  // console.log(contractABI);

  // console.log("contractAddr");
  // console.log(contractAddr);

  // console.log("contractInstance");
  // console.log(contractInstance?.address);
  // console.log(contractInstance?.provider);

  // console.log(contractInstance?.provider);

  return (
    <div>
      <Head>
        <title>Sintract</title>

        <meta
          name="Sintract: frontend for smart contract interaction"
          content="Solidity contract interactor"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col justify-center py-20">
        <ModalContractInput
          open={open}
          setOpen={setOpen}
          handleOnAddrInput={handleOnAddrInput}
          handleOnABIInput={handleOnABIInput}
          addrValue={inputAddr}
          abiValue={inputABI}
          handleOnSave={handleOnSave}
          handleOnCancel={handleOnCancel}
        />
        <div className="flex-col space-y-4 text-center">
          {/* <h1 className="text-center text-4xl font-bold sm:mt-4 sm:text-6xl">
            Sintract
            <br />
            Smart Contract Interactor
          </h1> */}
          <ProductDetails />
          <ConnectWallet
            isConnected={isConnected}
            chain={chain}
            address={address}
          />
          {isConnected && (
            <ContractData
              contractAddr={contractAddr}
              setContractAddr={setContractAddr}
              contractABI={contractABI}
              setContractABI={setContractABI}
              setShowModal={handleOnContractInfo}
            />
          )}
          {/* {isConnected && (
            <div className="flex flex-col space-y-4">
              {chain.id != moonbase.id && <SwitchTo toChain={moonbase} />}
              {chain.id != moonriver.id && <SwitchTo toChain={moonriver} />}
              {chain.id != moonbeam.id && <SwitchTo toChain={moonbeam} />}
            </div>
          )} */}
        </div>
        {isConnected && contractAddr && contractABI && (
          <div>
            <div>
              <p>Functions:</p>
            </div>
            <div className="grid flex-1 gap-1">
              {contractABI
                ?.filter((value) => value.type === "function")
                ?.map((value, index) => {
                  return value.stateMutability === "nonpayable" ? (
                    <CallCardContractWriteNonPayable
                      abiFnInfo={value}
                      key={index}
                      contractInstance={contractInstance}
                      contractABI={contractABI}
                    />
                  ) : value.stateMutability === "payable" ? (
                    <CallCardContractWritePayable
                      abiFnInfo={value}
                      key={index}
                      contractInstance={contractInstance}
                      contractABI={contractABI}
                    />
                  ) : (
                    <CallCardContractRead
                      abiFnInfo={value}
                      key={index}
                      contractInstance={contractInstance}
                      contractABI={contractABI}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ConnectWallet({ isConnected, chain, address }) {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return isConnected && chain ? (
    <div>
      <p>
        Connected Network:{" "}
        <span className="rounded-md border border-slate-700 bg-slate-800 p-1 text-sm font-semibold">
          {chain.name}
        </span>
      </p>
      <p className="mt-2">
        Connected Address:{" "}
        <span className="rounded-md border border-slate-700 bg-slate-800 p-1 text-sm font-semibold">
          {address}
        </span>
      </p>
    </div>
  ) : (
    <button
      className="inline-flex items-center rounded-md border border-cyan-700 bg-cyan-900 p-2 px-4 text-sm font-medium hover:bg-cyan-600"
      onClick={() => connect()}
    >
      <WalletIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      Connect Wallet
    </button>
  );
}

function ContractData({
  contractAddr,
  setContractAddr,
  contractABI,
  setContractABI,
  setShowModal,
}) {
  return (
    <div className="flex w-full place-content-center">
      <div className="w-1/3">
        <button
          className="inline-flex items-center rounded-md border border-cyan-700 bg-cyan-900 p-2 px-4 text-sm font-medium hover:bg-cyan-600"
          onClick={setShowModal}
        >
          <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {contractAddr ? "Edit" : "Enter"} contract info
        </button>
      </div>
    </div>
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
  contractABI: any;
};

function CallCardContractRead({
  abiFnInfo,
  contractInstance,
  contractABI,
}: ContractReadProps) {
  const [args, setArgs] = useState<any>(() =>
    Array.apply(null, Array(abiFnInfo?.inputs.length)).map(() => "")
  );

  const [isValidFnParams, setIsValidFnParams] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleOnInput = (e, i) => {
    const result = e.target.value;
    const newArgs = [...args];
    newArgs[i] = result;
    setArgs(newArgs);
  };

  // function handleOnSubmit() {
  //   setIsEnabled(true);
  // }

  useEffect(() => {
    if (args.length !== 0) {
      const isValidParams = !args.some(
        (arg) => arg === undefined || null || arg === ""
      );
      setIsValidFnParams(isValidParams);
    } else setIsValidFnParams(true);
  }, [args]);

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
          <FnParamsComponent
            abiFnInfo={abiFnInfo}
            args={args}
            setArgs={setArgs}
            handleOnInput={handleOnInput}
          />
        )}
      </div>
      <SubmitButtonReadContract
        isDisabled={isEnabled || !isValidFnParams}
        handleOnClick={() => setIsEnabled(true)}
        inProcess={isEnabled}
      />
      {isEnabled && isValidFnParams && (
        <ContractRead
          args={args}
          contractAddr={contractInstance.address}
          name={abiFnInfo.name}
          setIsEnabled={setIsEnabled}
          contractABI={contractABI}
        />
      )}
    </div>
  );
}

function ContractRead({ args, contractAddr, name, setIsEnabled, contractABI }) {
  // console.log("name");
  // console.log(name);
  useContractRead({
    abi: contractABI,
    address: contractAddr,
    functionName: name,
    onSuccess(data) {
      console.log(`${name} read: success`);
      console.log(data);
      setIsEnabled(false);
    },
    onError(error) {
      console.error(`${name} read: error`);
      console.error("Error", error);
      setIsEnabled(false);
    },
    args: args,
  });

  return null;
}

function CallCardContractWriteNonPayable({
  abiFnInfo,
  contractInstance,
  contractABI,
}: ContractReadProps) {
  const [args, setArgs] = useState(() =>
    Array.apply(null, Array(abiFnInfo?.inputs.length)).map(() => "")
  );

  const [isEnabled, setIsEnabled] = useState(false);

  const [inProcess, setInProcess] = useState(false);

  const handleOnInput = (e, i) => {
    const result = e.target.value;
    const newArgs = [...args];
    newArgs[i] = result;
    setArgs(newArgs);
  };

  // function handleOnSubmit() {
  //   setIsEnabled(true);
  // }

  const { config } = usePrepareContractWrite({
    address: contractInstance.address,
    abi: contractABI,
    functionName: abiFnInfo.name,
    args: args,
    enabled: isEnabled,
    onSuccess(data) {
      console.log(`${abiFnInfo.name} preparing write: success`);
      console.log(data);
      setInProcess(false);
    },
    onError(error) {
      console.error(`${abiFnInfo.name} preparing write: error`);
      console.error("Error", error);
      setInProcess(false);
    },
  });

  const { write } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log(`${abiFnInfo.name} write: success`);
      console.log(data);
      setInProcess(false);
    },
    onError(error) {
      console.error(`${abiFnInfo.name} write: error`);
      console.error("Error", error);
      setInProcess(false);
    },
  });

  const handleOnSubmit = () => {
    setInProcess(true);
    write?.();
  };

  useEffect(() => {
    if (args.length !== 0) {
      const isValidFnParams = !args.some(
        (arg) => arg === undefined || null || arg === ""
      );
      setIsEnabled(isValidFnParams);
    } else setIsEnabled(true);
  }, [args]);

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
          <FnParamsComponent
            abiFnInfo={abiFnInfo}
            args={args}
            setArgs={setArgs}
            handleOnInput={handleOnInput}
          />
        )}
      </div>
      <SubmitButtonWriteContract
        isDisabled={!write || !isEnabled || inProcess}
        handleOnClick={handleOnSubmit}
        inProcess={inProcess}
      />
    </div>
  );
}

function CallCardContractWritePayable({
  abiFnInfo,
  contractInstance,
  contractABI,
}: ContractReadProps) {
  const [args, setArgs] = useState(() =>
    Array.apply(null, Array(abiFnInfo?.inputs.length)).map(() => "")
  );

  const [amountInput, setAmountInput] = useState("");

  const [amount, setAmount] = useState("0");

  const [isEnabled, setIsEnabled] = useState(false);

  const handleOnInput = (e, i) => {
    const result = e.target.value;
    const newArgs = [...args];
    newArgs[i] = result;
    setArgs(newArgs);
  };

  const handleOnAmountInput = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    if (result === "") {
      setAmount("0");
    } else setAmount(result);
    setAmountInput(result);
  };

  // function handleOnSubmit() {
  //   setIsEnabled(true);
  // }

  const { config } = usePrepareContractWrite({
    address: contractInstance.address,
    abi: contractABI,
    functionName: abiFnInfo.name,
    args: args,
    overrides: {
      value: ethers.utils.parseUnits(amount, 0),
    },
    enabled: isEnabled,
  });

  useEffect(() => {
    const isValidFnParams = !args.some(
      (arg) => arg === undefined || null || arg === ""
    );
    const isValidAmount = amountInput !== "";
    setIsEnabled(isValidAmount && isValidFnParams);
  }, [args, amountInput]);

  const { write } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log(`${abiFnInfo.name} write: success`);
      console.log(data);
      // setIsEnabled(false);
    },
    onError(error) {
      console.error(`${abiFnInfo.name} write: error`);
      console.error("Error", error);
      // setIsEnabled(false);
    },
  });

  const handleOnSubmit = () => {
    // setIsEnabled(true);
    write?.();
  };

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
          <FnParamsComponent
            abiFnInfo={abiFnInfo}
            args={args}
            setArgs={setArgs}
            handleOnInput={handleOnInput}
          />
        )}
      </div>
      <div>
        <label>ether amount:</label>
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-2">
          <input
            placeholder={"uint256"}
            onInput={(e) => handleOnAmountInput(e)}
            value={amountInput}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400
  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 lg:w-1/3"
          />
        </div>
      </div>
      <SubmitButtonWriteContract
        isDisabled={!write || !isEnabled}
        handleOnClick={handleOnSubmit}
      />
    </div>
  );
}

function UintInput({ arg, args, argIndex, setArgs }) {
  const [value, setValue] = useState("");
  const handleOnInput = (e, i) => {
    const result = e.target.value.replace(/\D/g, "");
    const newArgs = [...args];
    newArgs[i] = result;
    setArgs(newArgs);
    setValue(result);
  };

  return (
    <input
      placeholder={arg?.type}
      onInput={(e) => handleOnInput(e, argIndex)}
      value={value}
      className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400
  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
    />
  );
}

// function UintEtherInput({ setAmount }) {
//   const [value, setValue] = useState("");
//   const handleOnInput = (e) => {
//     const result = e.target.value.replace(/\D/g, "");
//     setValue(result);
//     setValue(result);
//   };

//   return (
//     <input
//       placeholder={"uint256"}
//       onInput={(e) => handleOnInput(e)}
//       value={value}
//       className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400
//   shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
//     />
//   );
// }

function BytesInput({ arg, args, argIndex, setArgs }) {
  const [value, setValue] = useState("");
  const handleOnInput = (e) => {
    const result = e.target.value;
    const isBytes = ethers.utils.isBytes(result);
    const newArgs = [...args];
    if (isBytes) {
      newArgs[argIndex] = result;
      setArgs(newArgs);
    } else {
      const formated2Bytes = ethers.utils.formatBytes32String(result);
      newArgs[argIndex] = formated2Bytes;
      setArgs(newArgs);
    }
    setValue(result);
  };

  return (
    <input
      placeholder={arg?.type}
      onInput={(e) => handleOnInput(e)}
      value={value}
      className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400
  shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
    />
  );
}

function BoolInput({ arg, args, argIndex, setArgs }) {
  const handleOnSelect = (event) => {
    const result =
      event.target.value === "true"
        ? true
        : event.target.value === "false"
        ? false
        : "";
    const newArgs = [...args];
    newArgs[argIndex] = result;
    setArgs(newArgs);
  };

  return (
    <select
      name={arg.name}
      id={arg.name}
      className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900
    shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
      onChange={handleOnSelect}
    >
      <option
        value=""
        className="text-slate-400"
        onSelect={() => handleOnSelect("")}
      >
        --Please choose an option--
      </option>
      <option value="true" onSelect={() => handleOnSelect("true")}>
        true
      </option>
      <option value="false" onSelect={() => handleOnSelect("false")}>
        false
      </option>
    </select>
  );
}

function FnParamsComponent({ abiFnInfo, args, setArgs, handleOnInput }) {
  return (
    <div className="grid grid-cols-1 gap-2 rounded-lg border border-slate-700 bg-slate-900 p-2 md:grid-cols-2 lg:grid-cols-3">
      {abiFnInfo.inputs.map((arg, argIndex) => (
        <div key={argIndex} className="flex flex-col">
          {arg?.name && <label className="text-xs">{arg?.name}:</label>}
          {arg.type === "bool" ? (
            <BoolInput
              arg={arg}
              args={args}
              argIndex={argIndex}
              setArgs={setArgs}
            />
          ) : arg.type.slice(0, 5) === "bytes" ? (
            <BytesInput
              arg={arg}
              args={args}
              argIndex={argIndex}
              setArgs={setArgs}
            />
          ) : arg.type.slice(0, 4) === "uint" ? (
            <UintInput
              arg={arg}
              args={args}
              argIndex={argIndex}
              setArgs={setArgs}
            />
          ) : (
            <input
              placeholder={arg?.type}
              onInput={(e) => handleOnInput(e, argIndex)}
              value={args[argIndex]}
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400
      shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function SubmitButtonReadContract({
  isDisabled,
  handleOnClick,
  inProcess = false,
}) {
  return (
    <button
      className={`rounded-md border border-cyan-700 bg-cyan-900 p-2 px-4 text-sm font-medium hover:bg-cyan-600 ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${inProcess && "cursor-progress"}`}
      onClick={handleOnClick}
      disabled={isDisabled}
    >
      Submit
    </button>
  );
}

function SubmitButtonWriteContract({
  isDisabled,
  handleOnClick,
  inProcess = false,
}) {
  return (
    <button
      className={`rounded-md border border-cyan-700 bg-cyan-900 p-2 px-4 text-sm font-medium hover:bg-cyan-600 ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${inProcess && "cursor-progress"}`}
      onClick={handleOnClick}
      disabled={isDisabled}
    >
      Submit
    </button>
  );
}

function ProductDetails() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold tracking-tight text-cyan-500 sm:text-6xl">
        Sintract
      </h2>
      <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">
        Interact with your deployed <br />
        smart contracts
      </p>
      <div className="mt-4 flex place-content-center font-extralight text-gray-400">
        <ul className="w-100 list-inside list-disc text-left text-sm">
          <li>Say goodbye to annoying CLI</li>
          <li>No need to spend hours on coding frontend</li>
          <li>No need for going through troublesome verification</li>
        </ul>
      </div>
    </div>
  );
}
