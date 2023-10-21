import hardhat,  { ethers } from "hardhat";

async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    const usdcContract = await ethers.getContractFactory("USDC")

    // const usdcToken = await usdcContract.deploy()
    // console.log(usdcToken.address)


    const usdc = await ethers.getContractAt("USDC", "0x198Bd08EcA211Dd56eaE444E6f0eA5F87674f0D4")
    // await usdc.transfer("0x75BE87691E2F11de7d29C33926e35eb2b4CEcb5C", "1000000000000000000000")
    // await usdc.transfer("0x0a22Ca95Bc9f40b6DE9d9bCF980C60F1957f0c3A", "1000000000000000000000")
    await usdc.transfer(nftOwner1.address, "1000000000000000000000")

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// sepolia
// 0x07B48B11F2493D108d9ebbF8A684d00f72EAcFd5

// mumbai
// 0x8c1a55B3c6629716571234A1935ad2F593853066
// 0xD9c0C74348C11a1ef99F954576AAB9E6b07455A8

// mumbai (again)
// 0x198Bd08EcA211Dd56eaE444E6f0eA5F87674f0D4
