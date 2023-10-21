import hardhat,  { ethers } from "hardhat";
import {BigNumber} from "ethers";

const _1e18 = BigNumber.from(10).pow(18)

async function main() {
    const [admin, nftOwner1, apecoin, tacobell] = await ethers.getSigners()
    const perksVaultContract = await ethers.getContractFactory("PerksVault")
    const apecoinAddress = "0x75BE87691E2F11de7d29C33926e35eb2b4CEcb5C"
    const tacobellAddress = "0x0a22Ca95Bc9f40b6DE9d9bCF980C60F1957f0c3A"
    // const perksVault = await perksVaultContract.deploy(
    //     "0x6f5756Ce3047Cc216c8582B1379E1DD117d720B1", // perks token
    //     "0x198Bd08EcA211Dd56eaE444E6f0eA5F87674f0D4"
    // )
    // console.log(perksVault.address)

    const perksVault = await ethers.getContractAt("PerksVault", "0xD3bfe26723D3527ce7139225Aac56Ed3F2b96e2f")

    // whitelist apecoin
    // await perksVault.connect(admin).whitelisteStore(apecoinAddress, 100000, 15589580, 73734873) // .1 fraction
    // await perksVault.connect(admin).whitelisteStore(tacobellAddress, 250000, 15625535, 73772894) // .25 fraction

    // await perksVault.whitelistedStores(apecoinAddress)

    const usdc = await ethers.getContractAt("USDC", "0x198Bd08EcA211Dd56eaE444E6f0eA5F87674f0D4")
    const perksToken = await ethers.getContractAt("PerksToken", "0x6f5756Ce3047Cc216c8582B1379E1DD117d720B1")

    // const allowed = await usdc.allowance(nftOwner1.address, perksVault.address)
    // console.log({allowed})
    // await usdc.connect(nftOwner1).approve(perksVault.address, BigNumber.from(500).mul(_1e18))
    // console.log('approve done')
    // const tx = await perksVault.connect(nftOwner1).depositUSDC(BigNumber.from(100).mul(_1e18), {gasLimit: 1000000})
    // console.log('deposit done')
    // console.log({tx})

    // await perksToken.connect(apecoin).approve(perksVault.address, BigNumber.from(1000).mul(_1e18))
    // console.log('approve done')

    // const tx = await perksVault.connect(nftOwner1).payToStore(apecoinAddress, BigNumber.from(10).mul(_1e18))
    // console.log('payToStore done')
    // console.log({tx})

    console.log(await perksVault.userUSDCAmount(nftOwner1.address))
    console.log(await perksVault.storeUsdcAmount(nftOwner1.address))
    console.log(await perksVault.storeUsdcAmount(nftOwner1.address))
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// sepolia 0x4a4e97E89e63438811f7646E7802300d5Fd4Bb3F

// mumbai 0x8078cB27dD51266950FE0317CB314F16f11Fac8b

// mumbai 0x20BE6670d018D88B25dfB76c5460455bFBa6182a

// mumbai 0x07714FeF94AAaA04A0E869c533F42f4ffE59116e

// mumbai 0xD3bfe26723D3527ce7139225Aac56Ed3F2b96e2f

// 15.589580204437878, 73.73487337057593