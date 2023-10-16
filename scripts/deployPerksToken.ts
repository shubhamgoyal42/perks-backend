import hardhat,  { ethers } from "hardhat";

async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    const perksTokenContract = await ethers.getContractFactory("PerksToken")
    const perksToken = await perksTokenContract.deploy()

    console.log(perksToken.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// 0xf290BE43b65583E6a45Ee13bD042081784a45a45