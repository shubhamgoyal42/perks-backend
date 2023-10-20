import hardhat,  { ethers } from "hardhat";

async function main() {
    const [admin, nftOwner1] = await ethers.getSigners()
    const usdcContract = await ethers.getContractFactory("USDC")
    const usdcToken = await usdcContract.deploy()

    console.log(usdcToken.address)

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