import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  PaidToStore,
  PerksEarned,
  PerksRedeemed,
  StoreAdded,
  StoreRemoved,
  USDCDeposited
} from "../generated/PerksVault/PerksVault"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPaidToStoreEvent(
  store: Address,
  user: Address,
  amount: BigInt
): PaidToStore {
  let paidToStoreEvent = changetype<PaidToStore>(newMockEvent())

  paidToStoreEvent.parameters = new Array()

  paidToStoreEvent.parameters.push(
    new ethereum.EventParam("store", ethereum.Value.fromAddress(store))
  )
  paidToStoreEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  paidToStoreEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return paidToStoreEvent
}

export function createPerksEarnedEvent(
  user: Address,
  amount: BigInt
): PerksEarned {
  let perksEarnedEvent = changetype<PerksEarned>(newMockEvent())

  perksEarnedEvent.parameters = new Array()

  perksEarnedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  perksEarnedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return perksEarnedEvent
}

export function createPerksRedeemedEvent(
  user: Address,
  amount: BigInt
): PerksRedeemed {
  let perksRedeemedEvent = changetype<PerksRedeemed>(newMockEvent())

  perksRedeemedEvent.parameters = new Array()

  perksRedeemedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  perksRedeemedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return perksRedeemedEvent
}

export function createStoreAddedEvent(
  store: Address,
  storeNFT: Address,
  rewardFraction: BigInt,
  latitude: BigInt,
  longitude: BigInt
): StoreAdded {
  let storeAddedEvent = changetype<StoreAdded>(newMockEvent())

  storeAddedEvent.parameters = new Array()

  storeAddedEvent.parameters.push(
    new ethereum.EventParam("store", ethereum.Value.fromAddress(store))
  )
  storeAddedEvent.parameters.push(
    new ethereum.EventParam("storeNFT", ethereum.Value.fromAddress(storeNFT))
  )
  storeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardFraction",
      ethereum.Value.fromUnsignedBigInt(rewardFraction)
    )
  )
  storeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "latitude",
      ethereum.Value.fromSignedBigInt(latitude)
    )
  )
  storeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "longitude",
      ethereum.Value.fromSignedBigInt(longitude)
    )
  )

  return storeAddedEvent
}

export function createStoreRemovedEvent(store: Address): StoreRemoved {
  let storeRemovedEvent = changetype<StoreRemoved>(newMockEvent())

  storeRemovedEvent.parameters = new Array()

  storeRemovedEvent.parameters.push(
    new ethereum.EventParam("store", ethereum.Value.fromAddress(store))
  )

  return storeRemovedEvent
}

export function createUSDCDepositedEvent(
  user: Address,
  amount: BigInt
): USDCDeposited {
  let usdcDepositedEvent = changetype<USDCDeposited>(newMockEvent())

  usdcDepositedEvent.parameters = new Array()

  usdcDepositedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  usdcDepositedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return usdcDepositedEvent
}
