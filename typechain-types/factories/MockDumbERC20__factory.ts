/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockDumbERC20, MockDumbERC20Interface } from "../MockDumbERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "locked_",
        type: "bool",
      },
    ],
    name: "setLocked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000a0438038062000a048339810160408190526200003491620001f0565b8251620000499060049060208601906200007d565b5081516200005f9060059060208501906200007d565b506006805460ff191660ff9290921691909117905550620002b29050565b8280546200008b9062000275565b90600052602060002090601f016020900481019282620000af5760008555620000fa565b82601f10620000ca57805160ff1916838001178555620000fa565b82800160010185558215620000fa579182015b82811115620000fa578251825591602001919060010190620000dd565b50620001089291506200010c565b5090565b5b808211156200010857600081556001016200010d565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200014b57600080fd5b81516001600160401b038082111562000168576200016862000123565b604051601f8301601f19908116603f0116810190828211818310171562000193576200019362000123565b81604052838152602092508683858801011115620001b057600080fd5b600091505b83821015620001d45785820183015181830184015290820190620001b5565b83821115620001e65760008385830101525b9695505050505050565b6000806000606084860312156200020657600080fd5b83516001600160401b03808211156200021e57600080fd5b6200022c8783880162000139565b945060208601519150808211156200024357600080fd5b50620002528682870162000139565b925050604084015160ff811681146200026a57600080fd5b809150509250925092565b600181811c908216806200028a57607f821691505b60208210811415620002ac57634e487b7160e01b600052602260045260246000fd5b50919050565b61074280620002c26000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806340c10f191161007157806340c10f191461015757806370a082311461016a57806395d89b41146101935780639dc29fac1461019b578063a9059cbb146101ae578063dd62ed3e146101c157600080fd5b806306fdde03146100b9578063095ea7b3146100d757806318160ddd146100fa578063211e28b61461010c57806323b872dd1461012f578063313ce56714610142575b600080fd5b6100c16101fa565b6040516100ce9190610545565b60405180910390f35b6100ea6100e53660046105b6565b61028c565b60405190151581526020016100ce565b6003545b6040519081526020016100ce565b61012d61011a3660046105e0565b6000805460ff1916911515919091179055565b005b6100ea61013d366004610602565b6102e8565b60065460405160ff90911681526020016100ce565b61012d6101653660046105b6565b610418565b6100fe61017836600461063e565b6001600160a01b031660009081526001602052604090205490565b6100c161045b565b61012d6101a93660046105b6565b61046a565b6100ea6101bc3660046105b6565b61048d565b6100fe6101cf366004610659565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b6060600480546102099061068c565b80601f01602080910402602001604051908101604052809291908181526020018280546102359061068c565b80156102825780601f1061025757610100808354040283529160200191610282565b820191906000526020600020905b81548152906001019060200180831161026557829003601f168201915b5050505050905090565b3360009081526002602090815260408083206001600160a01b03861684529091528120546102ba908361052d565b3360009081526002602090815260408083206001600160a01b03881684529091529020555060015b92915050565b6000805460ff16156102fc57506000610411565b6001600160a01b03841660009081526001602052604090205482111561032457506000610411565b6001600160a01b038416600090815260026020908152604080832033845290915290205482111561035757506000610411565b6001600160a01b03841660009081526002602090815260408083203384529091529020546103859083610539565b6001600160a01b0385166000818152600260209081526040808320338452825280832094909455918152600190915220546103c09083610539565b6001600160a01b0380861660009081526001602052604080822093909355908516815220546103ef908361052d565b6001600160a01b03841660009081526001602081905260409091209190915590505b9392505050565b6001600160a01b03821660009081526001602052604090205461043b908261052d565b6001600160a01b0390921660009081526001602052604090209190915550565b6060600580546102099061068c565b6001600160a01b03821660009081526001602052604090205461043b9082610539565b6000805460ff16156104a1575060006102e2565b336000908152600160205260409020548211156104c0575060006102e2565b336000908152600160205260409020546104da9083610539565b33600090815260016020526040808220929092556001600160a01b03851681522054610506908361052d565b6001600160a01b038416600090815260016020819052604090912091909155905092915050565b600061041182846106dd565b600061041182846106f5565b600060208083528351808285015260005b8181101561057257858101830151858201604001528201610556565b81811115610584576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146105b157600080fd5b919050565b600080604083850312156105c957600080fd5b6105d28361059a565b946020939093013593505050565b6000602082840312156105f257600080fd5b8135801515811461041157600080fd5b60008060006060848603121561061757600080fd5b6106208461059a565b925061062e6020850161059a565b9150604084013590509250925092565b60006020828403121561065057600080fd5b6104118261059a565b6000806040838503121561066c57600080fd5b6106758361059a565b91506106836020840161059a565b90509250929050565b600181811c908216806106a057607f821691505b602082108114156106c157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156106f0576106f06106c7565b500190565b600082821015610707576107076106c7565b50039056fea2646970667358221220173a6c06563411145e9b07c4b146dc94ceff73f732937c92fc0768901be348de64736f6c63430008090033";

type MockDumbERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockDumbERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockDumbERC20__factory extends ContractFactory {
  constructor(...args: MockDumbERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockDumbERC20> {
    return super.deploy(
      name_,
      symbol_,
      decimals_,
      overrides || {}
    ) as Promise<MockDumbERC20>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    decimals_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      decimals_,
      overrides || {}
    );
  }
  attach(address: string): MockDumbERC20 {
    return super.attach(address) as MockDumbERC20;
  }
  connect(signer: Signer): MockDumbERC20__factory {
    return super.connect(signer) as MockDumbERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockDumbERC20Interface {
    return new utils.Interface(_abi) as MockDumbERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockDumbERC20 {
    return new Contract(address, _abi, signerOrProvider) as MockDumbERC20;
  }
}
