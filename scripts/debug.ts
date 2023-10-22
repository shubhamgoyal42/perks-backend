
import hardhat, { ethers } from "hardhat";
import { BigNumber } from "ethers";

const _1e18 = BigNumber.from(10).pow(18)
const CHAIN_ID = hardhat.network.config.chainId

let tx


async function main() {
    const [admin, nftOwner1, apecoin, tacobell] = await ethers.getSigners()
    const perksVault = await ethers.getContractAt("PerksVault", "0x5BDa05eF9181EdbE9621F405512aa6b41F2B3Fa1")
    const perksNFT = await ethers.getContractAt("PerksNFT", "0xB0af8247307c0e0fdED7b5DaF080B9A862b19CF2")
    const perksToken = await ethers.getContractAt("PerksToken", "0x290FB602eDc4e2d867c0a396115Bc243Ad35f404")
    // const perksToken = await perksTokenContract.deploy()

    // console.log(perksToken.address)

    // console.log(await perksVault.tba(nftOwner1.address))
    // console.log(await perksNFT.tokens(nftOwner1.address))
    // console.log(await perksVault.storeNFTs(apecoin.address))
    // console.log(await perksVault.userUSDCAmount(nftOwner1.address))
    // console.log(await perksVault.storeUsdcAmount(apecoin.address))
    // console.log(await perksVault.erc6551Registry())
    // console.log(await perksVault.erc6551Account())
    // await perksVault.transfer("0x75BE87691E2F11de7d29C33926e35eb2b4CEcb5C", "1000000000000000000000")
    // await perksVault.transfer("0x0a22Ca95Bc9f40b6DE9d9bCF980C60F1957f0c3A", "1000000000000000000000")

    const tba = await ethers.getContractAt("ERC6551Account", "0x331Ccc252d57f979219513929467F73a65B41640")

    // const amountToApprove = ethers.utils.parseUnits("100", "18"); // 100 tokens

    // const data = perksToken.interface.encodeFunctionData("approve", [
    //     perksVault.address,
    //     amountToApprove
    // ]);

    // // Execute the call
    // const tx = await tba.connect(nftOwner1).executeCall(
    //     perksToken.address,
    //     0, // sending no ether
    //     data
    // );

    // await tx.wait();
    // console.log(`Executed call. Transaction hash: ${tx.hash}`);


    console.log(await perksToken.allowance("0x331Ccc252d57f979219513929467F73a65B41640", perksVault.address))
    // await perksVault.connect(nftOwner1).redeemPerksTokens(ethers.utils.parseUnits(".01", "18"), apecoin.address)
    // console.log('succes')

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

