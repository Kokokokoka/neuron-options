/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Mock0xERC20Proxy,
  Mock0xERC20ProxyInterface,
} from "../Mock0xERC20Proxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061042a806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80632c54de4f14610030575b600080fd5b61004361003e36600461030c565b610045565b005b61005184848484610057565b50505050565b604080516001600160a01b038581166024830152848116604483015260648083018590528351808403909101815260849092018352602080830180516001600160e01b03166323b872dd60e01b17905283518085019094528084527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656490840152610051928792916000916100ef918516908490610176565b805190915015610171578080602001905181019061010d9190610357565b6101715760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084015b60405180910390fd5b505050565b6060610185848460008561018f565b90505b9392505050565b6060824710156101f05760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610168565b843b61023e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610168565b600080866001600160a01b0316858760405161025a91906103a5565b60006040518083038185875af1925050503d8060008114610297576040519150601f19603f3d011682016040523d82523d6000602084013e61029c565b606091505b50915091506102ac8282866102b7565b979650505050505050565b606083156102c6575081610188565b8251156102d65782518084602001fd5b8160405162461bcd60e51b815260040161016891906103c1565b80356001600160a01b038116811461030757600080fd5b919050565b6000806000806080858703121561032257600080fd5b61032b856102f0565b9350610339602086016102f0565b9250610347604086016102f0565b9396929550929360600135925050565b60006020828403121561036957600080fd5b8151801515811461018857600080fd5b60005b8381101561039457818101518382015260200161037c565b838111156100515750506000910152565b600082516103b7818460208701610379565b9190910192915050565b60208152600082518060208401526103e0816040850160208701610379565b601f01601f1916919091016040019291505056fea264697066735822122012a279e99dee3e06a62ae869f641f2bb74cf3fd1fb7d2d95c26959824178f58864736f6c63430008090033";

type Mock0xERC20ProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Mock0xERC20ProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Mock0xERC20Proxy__factory extends ContractFactory {
  constructor(...args: Mock0xERC20ProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Mock0xERC20Proxy> {
    return super.deploy(overrides || {}) as Promise<Mock0xERC20Proxy>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Mock0xERC20Proxy {
    return super.attach(address) as Mock0xERC20Proxy;
  }
  connect(signer: Signer): Mock0xERC20Proxy__factory {
    return super.connect(signer) as Mock0xERC20Proxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Mock0xERC20ProxyInterface {
    return new utils.Interface(_abi) as Mock0xERC20ProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Mock0xERC20Proxy {
    return new Contract(address, _abi, signerOrProvider) as Mock0xERC20Proxy;
  }
}
