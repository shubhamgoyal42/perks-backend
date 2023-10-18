import hardhat,  { ethers } from "hardhat";


async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    const perksVaultContract = await ethers.getContractFactory("PerksVault")
    // const perksVault = await perksVaultContract.deploy(
    //     "0x64255ed21366DB43d89736EE48928b890A84E2Cb", // pool manager
    //     "0xf290BE43b65583E6a45Ee13bD042081784a45a45", // perks token
    //     )

    // console.log(perksVault.address)

    const perksVault = await ethers.getContractAt("PerksVault", "0x4a4e97E89e63438811f7646E7802300d5Fd4Bb3F")

    const poolKey = {
        currency0: "0x07B48B11F2493D108d9ebbF8A684d00f72EAcFd5",
        currency1: "0xf290BE43b65583E6a45Ee13bD042081784a45a45",
        fee: 3000,
        tickSpacing: 60,
        hooks: "0x0870573e62D36fd5Ec21D309E55c657ea46f128B",
    }
    let tx = await perksVault.setUniswapPoolId(poolKey)
    console.log(tx)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// 0x4a4e97E89e63438811f7646E7802300d5Fd4Bb3F






// address constant PerksToken = address(0xf290BE43b65583E6a45Ee13bD042081784a45a45);
// address constant USDC = address(0x07B48B11F2493D108d9ebbF8A684d00f72EAcFd5); // custom
// ERC721OwnershipHook constant hook = ERC721OwnershipHook(address(0x0870573e62D36fd5Ec21D309E55c657ea46f128B));
// poolKey = PoolKey(Currency.wrap(USDC), Currency.wrap(PerksToken), 3000, 60, IHooks(hook));
