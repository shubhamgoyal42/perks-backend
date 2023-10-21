import hardhat,  { ethers } from "hardhat";

async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    const perksTokenContract = await ethers.getContractFactory("PerksToken")
    // const perksToken = await perksTokenContract.deploy()

    // console.log(perksToken.address)

    const perksToken = await ethers.getContractAt("PerksToken", "0x6f5756Ce3047Cc216c8582B1379E1DD117d720B1")
    
    await perksToken.transfer("0x75BE87691E2F11de7d29C33926e35eb2b4CEcb5C", "1000000000000000000000")
    await perksToken.transfer("0x0a22Ca95Bc9f40b6DE9d9bCF980C60F1957f0c3A", "1000000000000000000000")

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// sepolia
// 0xf290BE43b65583E6a45Ee13bD042081784a45a45


// mumbai
// 0xEc0941828C0C8af69525F797efe9512de0b4A51a


// mumbai (again) - updated version
// 0x6f5756Ce3047Cc216c8582B1379E1DD117d720B1
