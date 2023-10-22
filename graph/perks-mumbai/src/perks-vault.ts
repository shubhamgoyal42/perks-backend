import {
  OwnershipTransferred as OwnershipTransferredEvent,
  PaidToStore as PaidToStoreEvent,
  PerksEarned as PerksEarnedEvent,
  PerksRedeemed as PerksRedeemedEvent,
  StoreAdded as StoreAddedEvent,
  StoreRemoved as StoreRemovedEvent,
  USDCDeposited as USDCDepositedEvent
} from "../generated/PerksVault/PerksVault"
import {
  OwnershipTransferred,
  PaidToStore,
  PerksEarned,
  PerksRedeemed,
  StoreAdded,
  StoreRemoved,
  USDCDeposited
} from "../generated/schema"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaidToStore(event: PaidToStoreEvent): void {
  let entity = new PaidToStore(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.store = event.params.store
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePerksEarned(event: PerksEarnedEvent): void {
  let entity = new PerksEarned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePerksRedeemed(event: PerksRedeemedEvent): void {
  let entity = new PerksRedeemed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStoreAdded(event: StoreAddedEvent): void {
  let entity = new StoreAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.store = event.params.store
  entity.storeNFT = event.params.storeNFT
  entity.rewardFraction = event.params.rewardFraction
  entity.latitude = event.params.latitude
  entity.longitude = event.params.longitude

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStoreRemoved(event: StoreRemovedEvent): void {
  let entity = new StoreRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.store = event.params.store

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUSDCDeposited(event: USDCDepositedEvent): void {
  let entity = new USDCDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
