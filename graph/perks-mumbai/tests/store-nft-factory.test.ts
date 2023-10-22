import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Address } from "@graphprotocol/graph-ts"
import { StoreNFTCreated } from "../generated/schema"
import { StoreNFTCreated as StoreNFTCreatedEvent } from "../generated/StoreNFTFactory/StoreNFTFactory"
import { handleStoreNFTCreated } from "../src/store-nft-factory"
import { createStoreNFTCreatedEvent } from "./store-nft-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let name = "Example string value"
    let storeNFT = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newStoreNFTCreatedEvent = createStoreNFTCreatedEvent(
      creator,
      name,
      storeNFT
    )
    handleStoreNFTCreated(newStoreNFTCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("StoreNFTCreated created and stored", () => {
    assert.entityCount("StoreNFTCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "StoreNFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "StoreNFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "StoreNFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "storeNFT",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
