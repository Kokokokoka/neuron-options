/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type VaultStruct = {
  shortOtoken: string;
  longOtoken: string;
  collateralAssets: string[];
  shortAmount: BigNumberish;
  longAmount: BigNumberish;
  usedLongAmount: BigNumberish;
  collateralAmounts: BigNumberish[];
  usedCollateralAmounts: BigNumberish[];
  reservedCollateralValues: BigNumberish[];
  unusedCollateralAmounts: BigNumberish[];
};

export type VaultStructOutput = [
  string,
  string,
  string[],
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber[],
  BigNumber[],
  BigNumber[],
  BigNumber[]
] & {
  shortOtoken: string;
  longOtoken: string;
  collateralAssets: string[];
  shortAmount: BigNumber;
  longAmount: BigNumber;
  usedLongAmount: BigNumber;
  collateralAmounts: BigNumber[];
  usedCollateralAmounts: BigNumber[];
  reservedCollateralValues: BigNumber[];
  unusedCollateralAmounts: BigNumber[];
};

export type FixedPointIntStruct = { value: BigNumberish };

export type FixedPointIntStructOutput = [BigNumber] & { value: BigNumber };

export interface MarginCalculatorInterface extends utils.Interface {
  functions: {
    "AUCTION_TIME()": FunctionFragment;
    "getAfterBurnCollateralRatio((address,address,address[],uint256,uint256,uint256,uint256[],uint256[],uint256[],uint256[]),uint256)": FunctionFragment;
    "getCollateralDust(address)": FunctionFragment;
    "getCollateralRequired((address,address,address[],uint256,uint256,uint256,uint256[],uint256[],uint256[],uint256[]),uint256)": FunctionFragment;
    "getExcessCollateral((address,address,address[],uint256,uint256,uint256,uint256[],uint256[],uint256[],uint256[]))": FunctionFragment;
    "getExpiredPayoutRate(address)": FunctionFragment;
    "getMaxPrice(address,address,address[],bool,uint256)": FunctionFragment;
    "getOracleDeviation()": FunctionFragment;
    "getPayout(address,uint256)": FunctionFragment;
    "getTimesToExpiry(address,address,address[],bool)": FunctionFragment;
    "oracle()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setCollateralDust(address,uint256)": FunctionFragment;
    "setOracleDeviation(uint256)": FunctionFragment;
    "setUpperBoundValues(address,address,address[],bool,uint256[],uint256[])": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateUpperBoundValue(address,address,address[],bool,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "AUCTION_TIME",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAfterBurnCollateralRatio",
    values: [VaultStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollateralDust",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollateralRequired",
    values: [VaultStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getExcessCollateral",
    values: [VaultStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getExpiredPayoutRate",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxPrice",
    values: [string, string, string[], boolean, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getOracleDeviation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPayout",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTimesToExpiry",
    values: [string, string, string[], boolean]
  ): string;
  encodeFunctionData(functionFragment: "oracle", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setCollateralDust",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setOracleDeviation",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setUpperBoundValues",
    values: [string, string, string[], boolean, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateUpperBoundValue",
    values: [string, string, string[], boolean, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "AUCTION_TIME",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAfterBurnCollateralRatio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollateralDust",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollateralRequired",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExcessCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExpiredPayoutRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaxPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOracleDeviation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPayout", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTimesToExpiry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "oracle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCollateralDust",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOracleDeviation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setUpperBoundValues",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateUpperBoundValue",
    data: BytesLike
  ): Result;

  events: {
    "CollateralDustUpdated(address,uint256)": EventFragment;
    "MaxPriceAdded(bytes32,uint256,uint256)": EventFragment;
    "MaxPriceUpdated(bytes32,uint256,uint256,uint256)": EventFragment;
    "OracleDeviationUpdated(uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "SpotShockUpdated(bytes32,uint256)": EventFragment;
    "TimeToExpiryAdded(bytes32,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CollateralDustUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MaxPriceAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MaxPriceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OracleDeviationUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SpotShockUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TimeToExpiryAdded"): EventFragment;
}

export type CollateralDustUpdatedEvent = TypedEvent<
  [string, BigNumber],
  { collateral: string; dust: BigNumber }
>;

export type CollateralDustUpdatedEventFilter =
  TypedEventFilter<CollateralDustUpdatedEvent>;

export type MaxPriceAddedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { productHash: string; timeToExpiry: BigNumber; value: BigNumber }
>;

export type MaxPriceAddedEventFilter = TypedEventFilter<MaxPriceAddedEvent>;

export type MaxPriceUpdatedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber],
  {
    productHash: string;
    timeToExpiry: BigNumber;
    oldValue: BigNumber;
    newValue: BigNumber;
  }
>;

export type MaxPriceUpdatedEventFilter = TypedEventFilter<MaxPriceUpdatedEvent>;

export type OracleDeviationUpdatedEvent = TypedEvent<
  [BigNumber],
  { oracleDeviation: BigNumber }
>;

export type OracleDeviationUpdatedEventFilter =
  TypedEventFilter<OracleDeviationUpdatedEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type SpotShockUpdatedEvent = TypedEvent<
  [string, BigNumber],
  { product: string; spotShock: BigNumber }
>;

export type SpotShockUpdatedEventFilter =
  TypedEventFilter<SpotShockUpdatedEvent>;

export type TimeToExpiryAddedEvent = TypedEvent<
  [string, BigNumber],
  { productHash: string; timeToExpiry: BigNumber }
>;

export type TimeToExpiryAddedEventFilter =
  TypedEventFilter<TimeToExpiryAddedEvent>;

export interface MarginCalculator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarginCalculatorInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    AUCTION_TIME(overrides?: CallOverrides): Promise<[BigNumber]>;

    getAfterBurnCollateralRatio(
      _vault: VaultStruct,
      _shortBurnAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[FixedPointIntStructOutput, BigNumber]>;

    getCollateralDust(
      _collateral: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getCollateralRequired(
      _vault: VaultStruct,
      _shortAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], BigNumber[], BigNumber[], BigNumber[], BigNumber]>;

    getExcessCollateral(
      _vault: VaultStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], boolean]>;

    getExpiredPayoutRate(
      _otoken: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { collateralsPayoutRate: BigNumber[] }>;

    getMaxPrice(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timeToExpiry: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getOracleDeviation(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPayout(
      _otoken: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    getTimesToExpiry(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    oracle(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setCollateralDust(
      _collateral: string,
      _dust: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOracleDeviation(
      _deviation: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setUpperBoundValues(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timesToExpiry: BigNumberish[],
      _values: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateUpperBoundValue(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timeToExpiry: BigNumberish,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  AUCTION_TIME(overrides?: CallOverrides): Promise<BigNumber>;

  getAfterBurnCollateralRatio(
    _vault: VaultStruct,
    _shortBurnAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[FixedPointIntStructOutput, BigNumber]>;

  getCollateralDust(
    _collateral: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getCollateralRequired(
    _vault: VaultStruct,
    _shortAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber[], BigNumber[], BigNumber[], BigNumber[], BigNumber]>;

  getExcessCollateral(
    _vault: VaultStruct,
    overrides?: CallOverrides
  ): Promise<[BigNumber[], boolean]>;

  getExpiredPayoutRate(
    _otoken: string,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getMaxPrice(
    _underlying: string,
    _strike: string,
    _collaterals: string[],
    _isPut: boolean,
    _timeToExpiry: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getOracleDeviation(overrides?: CallOverrides): Promise<BigNumber>;

  getPayout(
    _otoken: string,
    _amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getTimesToExpiry(
    _underlying: string,
    _strike: string,
    _collaterals: string[],
    _isPut: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  oracle(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setCollateralDust(
    _collateral: string,
    _dust: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOracleDeviation(
    _deviation: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setUpperBoundValues(
    _underlying: string,
    _strike: string,
    _collaterals: string[],
    _isPut: boolean,
    _timesToExpiry: BigNumberish[],
    _values: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateUpperBoundValue(
    _underlying: string,
    _strike: string,
    _collaterals: string[],
    _isPut: boolean,
    _timeToExpiry: BigNumberish,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    AUCTION_TIME(overrides?: CallOverrides): Promise<BigNumber>;

    getAfterBurnCollateralRatio(
      _vault: VaultStruct,
      _shortBurnAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[FixedPointIntStructOutput, BigNumber]>;

    getCollateralDust(
      _collateral: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollateralRequired(
      _vault: VaultStruct,
      _shortAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], BigNumber[], BigNumber[], BigNumber[], BigNumber]>;

    getExcessCollateral(
      _vault: VaultStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber[], boolean]>;

    getExpiredPayoutRate(
      _otoken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getMaxPrice(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timeToExpiry: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOracleDeviation(overrides?: CallOverrides): Promise<BigNumber>;

    getPayout(
      _otoken: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getTimesToExpiry(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    oracle(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setCollateralDust(
      _collateral: string,
      _dust: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setOracleDeviation(
      _deviation: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setUpperBoundValues(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timesToExpiry: BigNumberish[],
      _values: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateUpperBoundValue(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timeToExpiry: BigNumberish,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CollateralDustUpdated(address,uint256)"(
      collateral?: string | null,
      dust?: null
    ): CollateralDustUpdatedEventFilter;
    CollateralDustUpdated(
      collateral?: string | null,
      dust?: null
    ): CollateralDustUpdatedEventFilter;

    "MaxPriceAdded(bytes32,uint256,uint256)"(
      productHash?: BytesLike | null,
      timeToExpiry?: null,
      value?: null
    ): MaxPriceAddedEventFilter;
    MaxPriceAdded(
      productHash?: BytesLike | null,
      timeToExpiry?: null,
      value?: null
    ): MaxPriceAddedEventFilter;

    "MaxPriceUpdated(bytes32,uint256,uint256,uint256)"(
      productHash?: BytesLike | null,
      timeToExpiry?: null,
      oldValue?: null,
      newValue?: null
    ): MaxPriceUpdatedEventFilter;
    MaxPriceUpdated(
      productHash?: BytesLike | null,
      timeToExpiry?: null,
      oldValue?: null,
      newValue?: null
    ): MaxPriceUpdatedEventFilter;

    "OracleDeviationUpdated(uint256)"(
      oracleDeviation?: null
    ): OracleDeviationUpdatedEventFilter;
    OracleDeviationUpdated(
      oracleDeviation?: null
    ): OracleDeviationUpdatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "SpotShockUpdated(bytes32,uint256)"(
      product?: BytesLike | null,
      spotShock?: null
    ): SpotShockUpdatedEventFilter;
    SpotShockUpdated(
      product?: BytesLike | null,
      spotShock?: null
    ): SpotShockUpdatedEventFilter;

    "TimeToExpiryAdded(bytes32,uint256)"(
      productHash?: BytesLike | null,
      timeToExpiry?: null
    ): TimeToExpiryAddedEventFilter;
    TimeToExpiryAdded(
      productHash?: BytesLike | null,
      timeToExpiry?: null
    ): TimeToExpiryAddedEventFilter;
  };

  estimateGas: {
    AUCTION_TIME(overrides?: CallOverrides): Promise<BigNumber>;

    getAfterBurnCollateralRatio(
      _vault: VaultStruct,
      _shortBurnAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollateralDust(
      _collateral: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCollateralRequired(
      _vault: VaultStruct,
      _shortAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExcessCollateral(
      _vault: VaultStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getExpiredPayoutRate(
      _otoken: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxPrice(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timeToExpiry: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOracleDeviation(overrides?: CallOverrides): Promise<BigNumber>;

    getPayout(
      _otoken: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTimesToExpiry(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    oracle(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setCollateralDust(
      _collateral: string,
      _dust: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOracleDeviation(
      _deviation: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setUpperBoundValues(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timesToExpiry: BigNumberish[],
      _values: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateUpperBoundValue(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timeToExpiry: BigNumberish,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    AUCTION_TIME(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAfterBurnCollateralRatio(
      _vault: VaultStruct,
      _shortBurnAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollateralDust(
      _collateral: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCollateralRequired(
      _vault: VaultStruct,
      _shortAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExcessCollateral(
      _vault: VaultStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExpiredPayoutRate(
      _otoken: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaxPrice(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timeToExpiry: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOracleDeviation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPayout(
      _otoken: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTimesToExpiry(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    oracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setCollateralDust(
      _collateral: string,
      _dust: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOracleDeviation(
      _deviation: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setUpperBoundValues(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timesToExpiry: BigNumberish[],
      _values: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateUpperBoundValue(
      _underlying: string,
      _strike: string,
      _collaterals: string[],
      _isPut: boolean,
      _timeToExpiry: BigNumberish,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
