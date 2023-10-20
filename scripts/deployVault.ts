import hardhat,  { ethers } from "hardhat";


async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    // const perksVaultContract = await ethers.getContractFactory("PerksVault")
    // const perksVault = await perksVaultContract.deploy(
    //     "0x5FF8780e4D20e75B8599A9C4528D8ac9682e5c89", // pool manager
    //     "0xEc0941828C0C8af69525F797efe9512de0b4A51a", // perks token
    //     )

    // console.log(perksVault.address)

    const perksVault = await ethers.getContractAt("PerksVault", "0x8078cB27dD51266950FE0317CB314F16f11Fac8b")

    const poolKey = {
        currency0: "0xD9c0C74348C11a1ef99F954576AAB9E6b07455A8",
        currency1: "0xEc0941828C0C8af69525F797efe9512de0b4A51a",
        fee: 3000,
        tickSpacing: 60,
        hooks: "0x08E834a760D976ae5d869F795AA8776509B09F03",
    }
    let tx = await perksVault.setUniswapPoolId(poolKey)
    console.log(tx)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// sepolia 0x4a4e97E89e63438811f7646E7802300d5Fd4Bb3F

// mumbai 0x8078cB27dD51266950FE0317CB314F16f11Fac8b