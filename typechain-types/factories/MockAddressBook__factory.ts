/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockAddressBook,
  MockAddressBookInterface,
} from "../MockAddressBook";

const _abi = [
  {
    inputs: [],
    name: "getController",
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
    name: "getMarginCalculator",
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
    name: "getMarginPool",
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
    name: "getOracle",
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
    name: "getOtokenFactory",
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
    name: "getOtokenImpl",
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
    name: "getWhitelist",
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
    inputs: [
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
    ],
    name: "setController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_calculator",
        type: "address",
      },
    ],
    name: "setMarginCalculator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    name: "setMarginPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_oracleAddr",
        type: "address",
      },
    ],
    name: "setOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_otokenFactory",
        type: "address",
      },
    ],
    name: "setOtokenFactory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newImpl",
        type: "address",
      },
    ],
    name: "setOtokenImpl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newImpl",
        type: "address",
      },
    ],
    name: "setWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610336806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063a8de41d51161008c578063d01f63f511610066578063d01f63f51461022f578063d94f323e14610240578063e7cf784114610270578063e9f2e8be146102a057600080fd5b8063a8de41d5146101dd578063b508ac99146101ee578063cf28493f1461021e57600080fd5b80637adbf973116100c85780637adbf9731461013a578063833b1fce1461016c578063854cff2f1461017d57806392eefe9b146101ad57600080fd5b80631ffaf0db146100ef5780633018205f146101185780637548634214610129575b600080fd5b6002546001600160a01b03165b6040516001600160a01b03909116815260200160405180910390f35b6004546001600160a01b03166100fc565b6007546001600160a01b03166100fc565b61016a6101483660046102d0565b600580546001600160a01b0319166001600160a01b0392909216919091179055565b005b6005546001600160a01b03166100fc565b61016a61018b3660046102d0565b600180546001600160a01b0319166001600160a01b0392909216919091179055565b61016a6101bb3660046102d0565b600480546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b03166100fc565b61016a6101fc3660046102d0565b600080546001600160a01b0319166001600160a01b0392909216919091179055565b6006546001600160a01b03166100fc565b6001546001600160a01b03166100fc565b61016a61024e3660046102d0565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b61016a61027e3660046102d0565b600780546001600160a01b0319166001600160a01b0392909216919091179055565b61016a6102ae3660046102d0565b600680546001600160a01b0319166001600160a01b0392909216919091179055565b6000602082840312156102e257600080fd5b81356001600160a01b03811681146102f957600080fd5b939250505056fea264697066735822122070e61fa951f9afb8a5eb393f53c1abd47cd60a6ae91f4e2704a99ffbdd488c3564736f6c63430008090033";

type MockAddressBookConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockAddressBookConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockAddressBook__factory extends ContractFactory {
  constructor(...args: MockAddressBookConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockAddressBook> {
    return super.deploy(overrides || {}) as Promise<MockAddressBook>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockAddressBook {
    return super.attach(address) as MockAddressBook;
  }
  connect(signer: Signer): MockAddressBook__factory {
    return super.connect(signer) as MockAddressBook__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockAddressBookInterface {
    return new utils.Interface(_abi) as MockAddressBookInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockAddressBook {
    return new Contract(address, _abi, signerOrProvider) as MockAddressBook;
  }
}
