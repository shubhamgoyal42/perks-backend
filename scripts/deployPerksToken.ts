import hardhat,  { ethers } from "hardhat";

async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    const perksTokenContract = await ethers.getContractFactory("PerksToken")
    const perksToken = await perksTokenContract.deploy()

    console.log(perksToken.address)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// sepolia
// 0xf290BE43b65583E6a45Ee13bD042081784a45a45


// mumbai
// 0xEc0941828C0C8af69525F797efe9512de0b4A51a