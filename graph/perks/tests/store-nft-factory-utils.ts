import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { StoreNFTCreated } from "../generated/StoreNFTFactory/StoreNFTFactory"

export function createStoreNFTCreatedEvent(
  creator: Address,
  name: string,
  storeNFT: Address
): StoreNFTCreated {
  let storeNftCreatedEvent = changetype<StoreNFTCreated>(newMockEvent())

  storeNftCreatedEvent.parameters = new Array()

  storeNftCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  storeNftCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  storeNftCreatedEvent.parameters.push(
    new ethereum.EventParam("storeNFT", ethereum.Value.fromAddress(storeNFT))
  )

  return storeNftCreatedEvent
}
