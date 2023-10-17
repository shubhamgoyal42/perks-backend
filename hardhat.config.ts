import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";  // Required for deploying contracts, etc.
// import "hardhat-preprocessor";
// import fs from "fs";

const pk = process.env.PRIVATE_KEY || ''

// function getRemappings() {
//   return fs
//     .readFileSync("remappings.txt", "utf8")
//     .split("\n")
//     .filter(Boolean) // remove empty lines
//     .map((line) => line.trim().split("="));
// }

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/06800f8293644a29b29acbc1148042f1",
      accounts: [ pk ],
      chainId: 5,
      gasPrice: 20000000000,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/06800f8293644a29b29acbc1148042f1",
      accounts: [
        pk, // admin
        "f2b0d0d488b324545d32b0a82e6a0097fffa6c7e0cc794d1e8ad515f5331a1fc" // nft #1 holder
      ],
      chainId: 11155111,
      // gasPrice: 20000000000, // You can adjust the gas price or other parameters if necessary
    }
  },

  // preprocess: {
  //   eachLine: (hre) => ({
  //     transform: (line: string) => {
  //       if (line.match(/^\s*import /i)) {
  //         for (const [from, to] of getRemappings()) {
  //           if (line.includes(from)) {
  //             line = line.replace(from, to);
  //             break;
  //           }
  //         }
  //       }
  //       return line;
  //     },
  //   }),
  // },
  // paths: {
  //   sources: "./src",
  //   cache: "./cache_hardhat",
  // },

};

export default config;
