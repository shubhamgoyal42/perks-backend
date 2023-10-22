import hardhat, { ethers } from "hardhat";
import {BigNumber} from "ethers";

const _1e18 = BigNumber.from(10).pow(18)
const CHAIN_ID = hardhat.network.config.chainId

let tx

async function main() {
    const [admin, nft1Owner, apecoin, tacobell] = await ethers.getSigners()
    const usdcContract = await ethers.getContractFactory("USDC")

    const usdcToken = await usdcContract.deploy()
    console.log("usdcToken address = ", usdcToken.address)
    await usdcToken.deployed()

    const perksTokenContract = await ethers.getContractFactory("PerksToken")
    const perksToken = await perksTokenContract.deploy()
    console.log("perksToken address = ", perksToken.address)
    await perksToken.deployed()

    const perksNFT = await ethers.deployContract("PerksNFT", []);
    console.log('perksNFT address = ', perksNFT.address)
    await perksNFT.deployed()

    const registry = await ethers.deployContract("ERC6551Registry", []);
    console.log('6551 registry address = ', registry.address)
    await registry.deployed()

    const accountImpl = await ethers.deployContract("ERC6551Account", []);
    console.log('6551 accountImpl address = ', accountImpl.address)
    await accountImpl.deployed()

    const perksVaultContract = await ethers.getContractFactory("PerksVault")
    const perksVault = await perksVaultContract.deploy(
        perksToken.address,
        usdcToken.address,
        perksNFT.address,
        registry.address,
        accountImpl.address
    )
    console.log("perksVault address = ", perksVault.address)
    await perksVault.deployed()

    // mint token #1 for nft1Owner
    tx = await perksNFT.safeMint(nft1Owner.address); await tx.wait();
    console.log('minted perkfNFT token #1')

    const tbaAddr = await registry.account(accountImpl.address, CHAIN_ID, perksNFT.address, 1, 0)
    console.log("token bound address for NFT #1 = ", tbaAddr)
    const nft1TBA = await ethers.getContractAt("ERC6551Account", tbaAddr)

    tx = await registry.createAccount(accountImpl.address, CHAIN_ID, perksNFT.address, 1, 0, []); await tx.wait();
    console.log('tba created')

    const StoreNFTFactory = await ethers.getContractFactory("StoreNFTFactory");
    const storeNFTFactory = await StoreNFTFactory.deploy();
    console.log("StoreNFTFactory address = ", storeNFTFactory.address);
    await storeNFTFactory.deployed()

    let createTx = await storeNFTFactory.createStoreNFT("ApeCoin", admin.address, perksVault.address, "https://ipfs.io/ipfs/QmPkAPqDXCWbq4z7uG1PQmK1ztdZG4fvXevtiWPrzt4vs4/mba_nft.png");
    await createTx.wait();

    let receipt = await admin.provider.getTransactionReceipt(createTx.hash);
    console.log(JSON.stringify(receipt.logs, null, 2))
    let event = StoreNFTFactory.interface.parseLog(receipt.logs[1]);
    console.log("Apecoin NFT address = ", event.args.storeNFT);

    const apecoinNFT = await ethers.getContractAt("StoreNFT", event.args.storeNFT)
    tx = await perksVault.whitelisteStore(apecoin.address, apecoinNFT.address, 100000, 15589580, 73734873); await tx.wait()

    createTx = await storeNFTFactory.createStoreNFT("Tacobell", admin.address, perksVault.address, "https://ipfs.io/ipfs/QmPkAPqDXCWbq4z7uG1PQmK1ztdZG4fvXevtiWPrzt4vs4/taco_bell_nft.png");
    await createTx.wait();

    receipt = await admin.provider.getTransactionReceipt(createTx.hash);
    event = StoreNFTFactory.interface.parseLog(receipt.logs[1]);
    console.log("Tacobell NFT address = ", event.args.storeNFT);

    const tacobellNFT = await ethers.getContractAt("StoreNFT", event.args.storeNFT)
    tx = await perksVault.whitelisteStore(tacobell.address, tacobellNFT.address, 250000, 15625535, 73772894); await tx.wait()

    // allocate some USDC to nft1Owner, apecoin, tacobell

    tx = await usdcToken.transfer(nft1Owner.address, BigNumber.from(1000).mul(_1e18)); await tx.wait()
    tx = await usdcToken.connect(nft1Owner).approve(perksVault.address, BigNumber.from(1000).mul(_1e18)); await tx.wait()

    // approve perksToken to transfer perks token from TBA account
    const data = perksToken.interface.encodeFunctionData("approve", [
        perksVault.address,
        BigNumber.from(100).mul(_1e18)
    ]);
    tx = await nft1TBA.connect(nft1Owner).executeCall(
        perksToken.address,
        0, // sending no ether
        data
    );; await tx.wait()

    tx = await perksToken.transfer(apecoin.address, BigNumber.from(1000).mul(_1e18)); await tx.wait()
    tx = await perksToken.connect(apecoin).approve(perksVault.address, BigNumber.from(1000).mul(_1e18)); await tx.wait()
    console.log('funds transferred and approved')

    tx = await perksToken.transfer(tacobell.address, BigNumber.from(1000).mul(_1e18)); await tx.wait()
    tx = await perksToken.connect(tacobell).approve(perksVault.address, BigNumber.from(1000).mul(_1e18)); await tx.wait()

    tx = await perksVault.connect(nft1Owner).depositUSDC(BigNumber.from(500).mul(_1e18)); await tx.wait();
    console.log('$500 deposited to vault')

    tx = await perksVault.connect(nft1Owner).payToStore(apecoin.address, BigNumber.from(10).mul(_1e18)); await tx.wait();
    console.log('Paid $10 to apecoin')

    tx = await perksVault.connect(nft1Owner).payToStore(tacobell.address, BigNumber.from(100).mul(_1e18)); await tx.wait();
    console.log('Paid $100 to tacobell')

    tx = await perksVault.connect(nft1Owner).redeemPerksTokens(ethers.utils.parseUnits("1", "18"), apecoin.address); await tx.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
