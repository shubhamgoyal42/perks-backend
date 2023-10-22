import { StoreNFTCreated as StoreNFTCreatedEvent } from "../generated/StoreNFTFactory/StoreNFTFactory"
import { StoreNFTCreated } from "../generated/schema"

export function handleStoreNFTCreated(event: StoreNFTCreatedEvent): void {
  let entity = new StoreNFTCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.name = event.params.name
  entity.storeNFT = event.params.storeNFT

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
