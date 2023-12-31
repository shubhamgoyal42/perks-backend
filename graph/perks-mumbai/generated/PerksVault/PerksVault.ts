// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PaidToStore extends ethereum.Event {
  get params(): PaidToStore__Params {
    return new PaidToStore__Params(this);
  }
}

export class PaidToStore__Params {
  _event: PaidToStore;

  constructor(event: PaidToStore) {
    this._event = event;
  }

  get store(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get user(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class PerksEarned extends ethereum.Event {
  get params(): PerksEarned__Params {
    return new PerksEarned__Params(this);
  }
}

export class PerksEarned__Params {
  _event: PerksEarned;

  constructor(event: PerksEarned) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class PerksRedeemed extends ethereum.Event {
  get params(): PerksRedeemed__Params {
    return new PerksRedeemed__Params(this);
  }
}

export class PerksRedeemed__Params {
  _event: PerksRedeemed;

  constructor(event: PerksRedeemed) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class StoreAdded extends ethereum.Event {
  get params(): StoreAdded__Params {
    return new StoreAdded__Params(this);
  }
}

export class StoreAdded__Params {
  _event: StoreAdded;

  constructor(event: StoreAdded) {
    this._event = event;
  }

  get store(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get storeNFT(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get rewardFraction(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get latitude(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get longitude(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class StoreRemoved extends ethereum.Event {
  get params(): StoreRemoved__Params {
    return new StoreRemoved__Params(this);
  }
}

export class StoreRemoved__Params {
  _event: StoreRemoved;

  constructor(event: StoreRemoved) {
    this._event = event;
  }

  get store(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class USDCDeposited extends ethereum.Event {
  get params(): USDCDeposited__Params {
    return new USDCDeposited__Params(this);
  }
}

export class USDCDeposited__Params {
  _event: USDCDeposited;

  constructor(event: USDCDeposited) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class PerksVault extends ethereum.SmartContract {
  static bind(address: Address): PerksVault {
    return new PerksVault("PerksVault", address);
  }

  erc6551Account(): Address {
    let result = super.call("erc6551Account", "erc6551Account():(address)", []);

    return result[0].toAddress();
  }

  try_erc6551Account(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "erc6551Account",
      "erc6551Account():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  erc6551Registry(): Address {
    let result = super.call(
      "erc6551Registry",
      "erc6551Registry():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_erc6551Registry(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "erc6551Registry",
      "erc6551Registry():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  perksNFT(): Address {
    let result = super.call("perksNFT", "perksNFT():(address)", []);

    return result[0].toAddress();
  }

  try_perksNFT(): ethereum.CallResult<Address> {
    let result = super.tryCall("perksNFT", "perksNFT():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  perksToken(): Address {
    let result = super.call("perksToken", "perksToken():(address)", []);

    return result[0].toAddress();
  }

  try_perksToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("perksToken", "perksToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  rewardFraction(param0: Address): BigInt {
    let result = super.call(
      "rewardFraction",
      "rewardFraction(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_rewardFraction(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardFraction",
      "rewardFraction(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  storeNFTs(param0: Address): Address {
    let result = super.call("storeNFTs", "storeNFTs(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toAddress();
  }

  try_storeNFTs(param0: Address): ethereum.CallResult<Address> {
    let result = super.tryCall("storeNFTs", "storeNFTs(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  storeUsdcAmount(param0: Address): BigInt {
    let result = super.call(
      "storeUsdcAmount",
      "storeUsdcAmount(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_storeUsdcAmount(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "storeUsdcAmount",
      "storeUsdcAmount(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tba(param0: Address): Address {
    let result = super.call("tba", "tba(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toAddress();
  }

  try_tba(param0: Address): ethereum.CallResult<Address> {
    let result = super.tryCall("tba", "tba(address):(address)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  usdc(): Address {
    let result = super.call("usdc", "usdc():(address)", []);

    return result[0].toAddress();
  }

  try_usdc(): ethereum.CallResult<Address> {
    let result = super.tryCall("usdc", "usdc():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  userUSDCAmount(param0: Address): BigInt {
    let result = super.call(
      "userUSDCAmount",
      "userUSDCAmount(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_userUSDCAmount(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "userUSDCAmount",
      "userUSDCAmount(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  whitelistedStores(param0: Address): boolean {
    let result = super.call(
      "whitelistedStores",
      "whitelistedStores(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try_whitelistedStores(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "whitelistedStores",
      "whitelistedStores(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _perksToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _usdc(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _perksNFT(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _erc6551Registry(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _erc6551Account(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DeleteStoreCall extends ethereum.Call {
  get inputs(): DeleteStoreCall__Inputs {
    return new DeleteStoreCall__Inputs(this);
  }

  get outputs(): DeleteStoreCall__Outputs {
    return new DeleteStoreCall__Outputs(this);
  }
}

export class DeleteStoreCall__Inputs {
  _call: DeleteStoreCall;

  constructor(call: DeleteStoreCall) {
    this._call = call;
  }

  get store(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DeleteStoreCall__Outputs {
  _call: DeleteStoreCall;

  constructor(call: DeleteStoreCall) {
    this._call = call;
  }
}

export class DepositUSDCCall extends ethereum.Call {
  get inputs(): DepositUSDCCall__Inputs {
    return new DepositUSDCCall__Inputs(this);
  }

  get outputs(): DepositUSDCCall__Outputs {
    return new DepositUSDCCall__Outputs(this);
  }
}

export class DepositUSDCCall__Inputs {
  _call: DepositUSDCCall;

  constructor(call: DepositUSDCCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositUSDCCall__Outputs {
  _call: DepositUSDCCall;

  constructor(call: DepositUSDCCall) {
    this._call = call;
  }
}

export class PayToStoreCall extends ethereum.Call {
  get inputs(): PayToStoreCall__Inputs {
    return new PayToStoreCall__Inputs(this);
  }

  get outputs(): PayToStoreCall__Outputs {
    return new PayToStoreCall__Outputs(this);
  }
}

export class PayToStoreCall__Inputs {
  _call: PayToStoreCall;

  constructor(call: PayToStoreCall) {
    this._call = call;
  }

  get store(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get usdcAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class PayToStoreCall__Outputs {
  _call: PayToStoreCall;

  constructor(call: PayToStoreCall) {
    this._call = call;
  }
}

export class RedeemPerksTokensCall extends ethereum.Call {
  get inputs(): RedeemPerksTokensCall__Inputs {
    return new RedeemPerksTokensCall__Inputs(this);
  }

  get outputs(): RedeemPerksTokensCall__Outputs {
    return new RedeemPerksTokensCall__Outputs(this);
  }
}

export class RedeemPerksTokensCall__Inputs {
  _call: RedeemPerksTokensCall;

  constructor(call: RedeemPerksTokensCall) {
    this._call = call;
  }

  get perksAmount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get store(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RedeemPerksTokensCall__Outputs {
  _call: RedeemPerksTokensCall;

  constructor(call: RedeemPerksTokensCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class WhitelisteStoreCall extends ethereum.Call {
  get inputs(): WhitelisteStoreCall__Inputs {
    return new WhitelisteStoreCall__Inputs(this);
  }

  get outputs(): WhitelisteStoreCall__Outputs {
    return new WhitelisteStoreCall__Outputs(this);
  }
}

export class WhitelisteStoreCall__Inputs {
  _call: WhitelisteStoreCall;

  constructor(call: WhitelisteStoreCall) {
    this._call = call;
  }

  get store(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _storeNFT(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _rewardFraction(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get latitude(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get longitude(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class WhitelisteStoreCall__Outputs {
  _call: WhitelisteStoreCall;

  constructor(call: WhitelisteStoreCall) {
    this._call = call;
  }
}
