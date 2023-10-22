import hardhat, { ethers } from "hardhat";
import { Buffer } from 'buffer';
import { BigNumber, Contract, utils } from "ethers";


const MIN_TICK = -887220;
const MAX_TICK = -(MIN_TICK);

async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    // const perksVaultContract = await ethers.getContractFactory("PerksVault")
    // const perksVault = await perksVaultContract.deploy(
    //     "0x5FF8780e4D20e75B8599A9C4528D8ac9682e5c89", // pool manager
    //     "0xEc0941828C0C8af69525F797efe9512de0b4A51a", // perks token
    //     )

    // console.log(perksVault.address)

    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/06800f8293644a29b29acbc1148042f1")
    const perksVault = await ethers.getContractAt("PerksVault", "0x8078cB27dD51266950FE0317CB314F16f11Fac8b")
    const poolManager = await ethers.getContractAt("IPoolManager", "0x5FF8780e4D20e75B8599A9C4528D8ac9682e5c89")
    const testPoolManager = await ethers.getContractAt("PoolModifyPositionTest", "0x092D53306f9Df9eeD35efec24c31Ca32000033BC")
    const perksToken = await ethers.getContractAt("PerksToken", "0xEc0941828C0C8af69525F797efe9512de0b4A51a")
    const usdc = await ethers.getContractAt("USDC", "0xD9c0C74348C11a1ef99F954576AAB9E6b07455A8")
    // const poolManager2 = new ethers.Contract(
    //     "0x5FF8780e4D20e75B8599A9C4528D8ac9682e5c89",
    //     poolManagerABI,
    //     ethers.getDefaultProvider()
    // )
    // console.log({ poolManager2 })

    await perksToken.approve(testPoolManager.address, expandTo18Decimals(10000))
    await usdc.approve(testPoolManager.address, expandTo18Decimals(10000))
    console.log('approved')

    const poolKey = await perksVault.uniswapPoolKey()
    console.log({ poolKey })

    // const poolKeyString = JSON.stringify(poolKey);

    // Converting string to bytes
    // const poolKeyBytes = Buffer.from(poolKeyString);

    // // Hashing the bytes using keccak256
    // const hash = ethers.utils.keccak256(poolKeyBytes);

    // console.log({ hash })

    // const hashBytes = ethers.utils.arrayify(hash)
    // console.log({ hashBytes })

    // const hashBytes32 = ethers.utils.hexZeroPad(hash, 32);
    // console.log({ hashBytes32 })

    const poolId = getPoolId({
        currency0: poolKey.currency0,
        currency1: poolKey.currency1,
        fee: Number(poolKey.fee),
        tickSpacing: Number(poolKey.tickSpacing),
        hooks: poolKey.hooks,
    })
    console.log({ poolId })

    // console.log({fn: poolManager2.swap})
    // const liquidity = await poolManager.getLiquidity(hashBytes32)
    // console.log({ liquidity })
    // const poolStatus = await poolManager2.pools(hashBytes32)
    // console.log({ poolStatus })
    // const slot0 = await poolManager2.getSlot0(hashBytes32)
    // console.log({ slot0 })


    const modifyPositionParams = {
        // the lower and upper tick of the position
        tickLower: MIN_TICK,
        tickUpper: MAX_TICK,
        // how to modify the liquidity
        liquidityDelta: expandTo18Decimals(100),
    }

    try {
      const tx = await testPoolManager.modifyPosition(poolKey, modifyPositionParams, '0x00', { gasLimit: 1000000 })
      console.log(tx)
      const receipt = await tx.wait()
      console.log(receipt.logs)
      
    } catch (error: any) {
      console.error(error)      
      console.log(error.receipt.logs)      
    }
}

function expandTo18Decimals(n: number): BigNumber {
    return BigNumber.from(n).mul(BigNumber.from(10).pow(18))
  }
  

function getPoolId({
    currency0,
    currency1,
    fee,
    tickSpacing,
    hooks,
  }: {
    currency0: string | Contract
    currency1: string | Contract
    fee: number
    tickSpacing: number
    hooks: string | Contract
  }): string {
    return ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ['address', 'address', 'uint24', 'int24', 'address'],
        [
          typeof currency0 === 'string' ? currency0 : currency0.address,
          typeof currency1 === 'string' ? currency1 : currency1.address,
          fee,
          tickSpacing,
          typeof hooks === 'string' ? hooks : hooks.address,
        ]
      )
    )
  }
  
  
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// sepolia 0x4a4e97E89e63438811f7646E7802300d5Fd4Bb3F

// mumbai 0x8078cB27dD51266950FE0317CB314F16f11Fac8b