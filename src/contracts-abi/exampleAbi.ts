const exampleAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "calllerAddress",
        type: "address",
      },
    ],
    name: "feesWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "winnerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winnerIdAdress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "loserId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winnings",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "claimerAddress",
        type: "address",
      },
    ],
    name: "filledBetClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "enum BettingDex.Result",
        name: "result",
        type: "uint8",
      },
    ],
    name: "listingResultUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum BettingDex.Result",
        name: "result",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "listingFeesPer",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isExisting",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isDrawValid",
        type: "bool",
      },
    ],
    name: "newListing",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "listId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "betIdAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "odds",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum BettingDex.Result",
        name: "result",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum BettingDex.ForOrAgainst",
        name: "direction",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isFilled",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isExisting",
        type: "bool",
      },
    ],
    name: "newMakerBet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fillerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "listId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "betIdAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "odds",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum BettingDex.Result",
        name: "result",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "enum BettingDex.ForOrAgainst",
        name: "direction",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isFilled",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isExisting",
        type: "bool",
      },
    ],
    name: "newTakerBet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "betIdAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fees",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "claimerAddress",
        type: "address",
      },
    ],
    name: "unfilledBetClaimed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "bets",
    outputs: [
      {
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "betIdAddress",
        type: "address",
      },
      {
        internalType: "enum BettingDex.Result",
        name: "result",
        type: "uint8",
      },
      {
        internalType: "enum BettingDex.ForOrAgainst",
        name: "direction",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "betAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "odds",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isExisting",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isFilled",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "fillerId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
    ],
    name: "claimFilledBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
    ],
    name: "claimUnfilledBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        internalType: "enum BettingDex.Result",
        name: "result",
        type: "uint8",
      },
      {
        internalType: "enum BettingDex.ForOrAgainst",
        name: "direction",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "odds",
        type: "uint256",
      },
    ],
    name: "createMakerBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "listingStartTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "listingEndTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "listingFeesPer",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isDrawValid",
        type: "bool",
      },
    ],
    name: "createNewListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fillerId",
        type: "uint256",
      },
      {
        internalType: "enum BettingDex.Result",
        name: "result",
        type: "uint8",
      },
      {
        internalType: "enum BettingDex.ForOrAgainst",
        name: "direction",
        type: "uint8",
      },
    ],
    name: "createTakerBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "feesGenerated",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "odds",
        type: "uint256",
      },
      {
        internalType: "enum BettingDex.ForOrAgainst",
        name: "dir",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "makerBetAmount",
        type: "uint256",
      },
    ],
    name: "getTakerBetAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "fillerAmount",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bet1Id",
        type: "uint256",
      },
    ],
    name: "getWinnerLoserId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listings",
    outputs: [
      {
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "enum BettingDex.Result",
        name: "result",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "listingStartTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "listingEndTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "listingFeesPer",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isExisting",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isDrawValid",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minBetAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalLockedBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
      {
        internalType: "enum BettingDex.Result",
        name: "result",
        type: "uint8",
      },
    ],
    name: "updateListingResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "listingId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
    ],
    name: "updateListingResultAsCancelled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "withdrawFeesGenerated",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default exampleAbi;
