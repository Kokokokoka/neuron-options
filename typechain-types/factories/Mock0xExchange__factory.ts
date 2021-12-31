/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Mock0xExchange,
  Mock0xExchangeInterface,
} from "../Mock0xExchange";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "makerToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "takerToken",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "makerAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "takerAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "takerTokenFeeAmount",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address",
            name: "taker",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "feeRecipient",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "pool",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "expiry",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "salt",
            type: "uint256",
          },
        ],
        internalType: "struct ZeroXExchangeInterface.LimitOrder[]",
        name: "_orders",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "signatureType",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        internalType: "struct ZeroXExchangeInterface.Signature[]",
        name: "_signatures",
        type: "tuple[]",
      },
      {
        internalType: "uint128[]",
        name: "_takerTokenFillAmounts",
        type: "uint128[]",
      },
      {
        internalType: "bool",
        name: "_revertIfIncomplete",
        type: "bool",
      },
    ],
    name: "batchFillLimitOrders",
    outputs: [
      {
        internalType: "uint128[]",
        name: "takerTokenFilledAmounts",
        type: "uint128[]",
      },
      {
        internalType: "uint128[]",
        name: "makerTokenFilledAmounts",
        type: "uint128[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "called",
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
    name: "fillAmount",
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
        components: [
          {
            internalType: "address",
            name: "makerToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "takerToken",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "makerAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "takerAmount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "takerTokenFeeAmount",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "maker",
            type: "address",
          },
          {
            internalType: "address",
            name: "taker",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "feeRecipient",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "pool",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "expiry",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "salt",
            type: "uint256",
          },
        ],
        internalType: "struct ZeroXExchangeInterface.LimitOrder",
        name: "_order",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "signatureType",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        internalType: "struct ZeroXExchangeInterface.Signature",
        name: "_signature",
        type: "tuple",
      },
      {
        internalType: "uint128",
        name: "_takerTokenFillAmount",
        type: "uint128",
      },
    ],
    name: "fillLimitOrder",
    outputs: [
      {
        internalType: "uint128",
        name: "takerTokenFilledAmount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "makerTokenFilledAmount",
        type: "uint128",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "makerAmount",
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
    name: "proxy",
    outputs: [
      {
        internalType: "contract Mock0xERC20Proxy",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "signature",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "takerAmount",
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
];

const _bytecode =
  "0x60806040526000805534801561001457600080fd5b5060405161002190610063565b604051809103906000f08015801561003d573d6000803e3d6000fd5b50600580546001600160a01b0319166001600160a01b0392909216919091179055610070565b61044a8061095683390190565b6108d78061007f6000396000f3fe60806040526004361061007b5760003560e01c8063acd00a5c1161004e578063acd00a5c14610106578063dddfff871461011c578063ec55688914610132578063f6274f661461016a57600080fd5b80631baaa00b146100805780632b5bd88e146100aa57806350f9b6cd146100ce57806351ff4847146100e4575b600080fd5b61009361008e366004610620565b6101a3565b6040516100a192919061075c565b60405180910390f35b3480156100b657600080fd5b506100c060015481565b6040519081526020016100a1565b3480156100da57600080fd5b506100c060005481565b3480156100f057600080fd5b506100f9610268565b6040516100a1919061078a565b34801561011257600080fd5b506100c060045481565b34801561012857600080fd5b506100c060025481565b34801561013e57600080fd5b50600554610152906001600160a01b031681565b6040516001600160a01b0390911681526020016100a1565b6101836101783660046107df565b600080935093915050565b604080516001600160801b039384168152929091166020830152016100a1565b60608060005b865181101561025e576102078782815181106101c7576101c7610827565b60200260200101518783815181106101e1576101e1610827565b60200260200101518784815181106101fb576101fb610827565b50600093849350915050565b84838151811061021957610219610827565b6020026020010184848151811061023257610232610827565b6001600160801b03938416602091820292909201015291169052806102568161083d565b9150506101a9565b5094509492505050565b6003805461027590610866565b80601f01602080910402602001604051908101604052809291908181526020018280546102a190610866565b80156102ee5780601f106102c3576101008083540402835291602001916102ee565b820191906000526020600020905b8154815290600101906020018083116102d157829003601f168201915b505050505081565b634e487b7160e01b600052604160045260246000fd5b604051610180810167ffffffffffffffff81118282101715610330576103306102f6565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561035f5761035f6102f6565b604052919050565b600067ffffffffffffffff821115610381576103816102f6565b5060051b60200190565b80356001600160a01b03811681146103a257600080fd5b919050565b80356001600160801b03811681146103a257600080fd5b803567ffffffffffffffff811681146103a257600080fd5b600061018082840312156103e957600080fd5b6103f161030c565b90506103fc8261038b565b815261040a6020830161038b565b602082015261041b604083016103a7565b604082015261042c606083016103a7565b606082015261043d608083016103a7565b608082015261044e60a0830161038b565b60a082015261045f60c0830161038b565b60c082015261047060e0830161038b565b60e082015261010061048381840161038b565b9082015261012082810135908201526101406104a08184016103be565b818301525061016080830135818301525092915050565b803560ff811681146103a257600080fd5b6000608082840312156104da57600080fd5b6040516080810181811067ffffffffffffffff821117156104fd576104fd6102f6565b60405290508061050c836104b7565b815261051a602084016104b7565b602082015260408301356040820152606083013560608201525092915050565b600082601f83011261054b57600080fd5b8135602061056061055b83610367565b610336565b82815260079290921b8401810191818101908684111561057f57600080fd5b8286015b848110156105a35761059588826104c8565b835291830191608001610583565b509695505050505050565b600082601f8301126105bf57600080fd5b813560206105cf61055b83610367565b82815260059290921b840181019181810190868411156105ee57600080fd5b8286015b848110156105a357610603816103a7565b83529183019183016105f2565b803580151581146103a257600080fd5b6000806000806080858703121561063657600080fd5b843567ffffffffffffffff8082111561064e57600080fd5b818701915087601f83011261066257600080fd5b8135602061067261055b83610367565b828152610180928302850182019282820191908c85111561069257600080fd5b958301955b848710156106b8576106a98d886103d6565b83529586019591830191610697565b50985050880135925050808211156106cf57600080fd5b6106db8883890161053a565b945060408701359150808211156106f157600080fd5b506106fe878288016105ae565b92505061070d60608601610610565b905092959194509250565b600081518084526020808501945080840160005b838110156107515781516001600160801b03168752958201959082019060010161072c565b509495945050505050565b60408152600061076f6040830185610718565b82810360208401526107818185610718565b95945050505050565b600060208083528351808285015260005b818110156107b75785810183015185820160400152820161079b565b818111156107c9576000604083870101525b50601f01601f1916929092016040019392505050565b600080600061022084860312156107f557600080fd5b6107ff85856103d6565b925061080f8561018086016104c8565b915061081e61020085016103a7565b90509250925092565b634e487b7160e01b600052603260045260246000fd5b600060001982141561085f57634e487b7160e01b600052601160045260246000fd5b5060010190565b600181811c9082168061087a57607f821691505b6020821081141561089b57634e487b7160e01b600052602260045260246000fd5b5091905056fea2646970667358221220a307227b6b408ff29260434b0850d03be7d0025175dfe7163c67d6b307d5c44664736f6c63430008090033608060405234801561001057600080fd5b5061042a806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80632c54de4f14610030575b600080fd5b61004361003e36600461030c565b610045565b005b61005184848484610057565b50505050565b604080516001600160a01b038581166024830152848116604483015260648083018590528351808403909101815260849092018352602080830180516001600160e01b03166323b872dd60e01b17905283518085019094528084527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656490840152610051928792916000916100ef918516908490610176565b805190915015610171578080602001905181019061010d9190610357565b6101715760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084015b60405180910390fd5b505050565b6060610185848460008561018f565b90505b9392505050565b6060824710156101f05760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610168565b843b61023e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610168565b600080866001600160a01b0316858760405161025a91906103a5565b60006040518083038185875af1925050503d8060008114610297576040519150601f19603f3d011682016040523d82523d6000602084013e61029c565b606091505b50915091506102ac8282866102b7565b979650505050505050565b606083156102c6575081610188565b8251156102d65782518084602001fd5b8160405162461bcd60e51b815260040161016891906103c1565b80356001600160a01b038116811461030757600080fd5b919050565b6000806000806080858703121561032257600080fd5b61032b856102f0565b9350610339602086016102f0565b9250610347604086016102f0565b9396929550929360600135925050565b60006020828403121561036957600080fd5b8151801515811461018857600080fd5b60005b8381101561039457818101518382015260200161037c565b838111156100515750506000910152565b600082516103b7818460208701610379565b9190910192915050565b60208152600082518060208401526103e0816040850160208701610379565b601f01601f1916919091016040019291505056fea26469706673582212202f8c2d1e1c4ebca264226854eb66f934f7d6847ab62f02ab32541664ba8f472364736f6c63430008090033";

type Mock0xExchangeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Mock0xExchangeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Mock0xExchange__factory extends ContractFactory {
  constructor(...args: Mock0xExchangeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Mock0xExchange> {
    return super.deploy(overrides || {}) as Promise<Mock0xExchange>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Mock0xExchange {
    return super.attach(address) as Mock0xExchange;
  }
  connect(signer: Signer): Mock0xExchange__factory {
    return super.connect(signer) as Mock0xExchange__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Mock0xExchangeInterface {
    return new utils.Interface(_abi) as Mock0xExchangeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Mock0xExchange {
    return new Contract(address, _abi, signerOrProvider) as Mock0xExchange;
  }
}
