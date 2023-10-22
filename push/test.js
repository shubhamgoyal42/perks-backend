// Import Push SDK & Ethers
// import { PushAPI } from '@pushprotocol/restapi';
const { PushAPI } = require('@pushprotocol/restapi')
// import { ENV } from '@pushprotocol/constants';
// import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
// const { ENV } = require('@pushprotocol/constants')
const { createSocketConnection, EVENTS } = require('@pushprotocol/socket')
// import { ethers } from 'ethers';
const { ethers } = require('ethers')


async function main() {
    // Creating a random signer from a wallet, ideally this is the wallet you will connect
    // const signer = ethers.Wallet.createRandom();
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/06800f8293644a29b29acbc1148042f1")
    const apecoinAdmin = new ethers.Wallet("24b3c0322118e9682484c516bf1ce14587292a6658b60fa8cf575983cc9e976b", provider)

    // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
    const userApecoin = await PushAPI.initialize(apecoinAdmin, { env: 'staging' });

    // This will be the wallet address of the recipient 
    const bobWalletAddress = "0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666";

    // Send a message to Bob
    const aliceMessagesBob = await userApecoin.chat.send(bobWalletAddress, {
        content: "Gm gm! It's a me... Mario"
    });

    // // Create Socket to Listen to incoming messages
    // const pushSDKSocket = createSocketConnection({
    //     user: signer,
    //     socketType: 'chat',
    //     socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
    //     env: 'staging',
    // });

    // // React to message payload getting received
    // pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message) => {
    //     console.log(message);
    // });

    // const createdGroup = await userAlice.chat.group.create("perks group");

    // const apecoinAdmin = "0x75BE87691E2F11de7d29C33926e35eb2b4CEcb5C"
    const myTokenGatedGroup = await userApecoin.chat.group.create('BRB Chat', {
        description: 'Apecoin group chat', // provide short description of group
        image: 'data:image/png;base64,iVBORw0K...', // provide base64 encoded image
        members: [apecoinAdmin.address], // see types of recipient to learn more
        admins: [apecoinAdmin.address], // NFT addresses are supported as well
        private: true, // ensures chat within group is encrypted and is only visible to members of the group
        rules: { // define rules to gate different permissions of the group, ie: joining group or sending messages
            "entry": { // define condition for joining the group
                "conditions": { // set of all conditions that should be fulfilled to join the group
                    "all": [
                        { // define criteria 2
                            type: "PUSH", // define type that rules engine should go for, currently supports PUSH or GUILD
                            category: "ERC721", // define it's ERC20 token that you want to check, supports ERC721 as well
                            subcategory: "owner", // define if you are checking 'holder' or 'owner'
                            data: { // define the data check
                                "contract": "eip155:80001:0x02fb91EDDBBEA7B57051e36f3F3601d34C9533DF", // pass {blockchain_standard}:{chain_id}:{address} as a shorthand
                                "comparison": ">=", // what comparison needs to pass
                                "amount": 1, // amount that needs to passed
                                // "decimals": 18, // the decimals for the contract
                            },
                            access: true
                        },
                    ]
                }
            },
            "chat": {
                "conditions": { // define condition for sending message in the group
                    "all": [
                        { // define criteria 2
                            type: "PUSH", // define type that rules engine should go for, currently supports PUSH or GUILD
                            category: "ERC721", // define it's ERC20 token that you want to check, supports ERC721 as well
                            subcategory: "owner", // define if you are checking 'holder' or 'owner'
                            data: { // define the data check
                                "contract": "eip155:80001:0x02fb91EDDBBEA7B57051e36f3F3601d34C9533DF", // pass {blockchain_standard}:{chain_id}:{address} as a shorthand
                                "comparison": ">=", // what comparison needs to pass
                                "amount": 1, // amount that needs to passed
                                // "decimals": 18, // the decimals for the contract
                            },
                            access: false
                        },
                    ]
                }
            }
        }
    });

    console.log({myTokenGatedGroup})
    console.log(JSON.stringify(myTokenGatedGroup, null, 2))




    // const aliceChats = await userAlice.chat.list("CHATS");
    // console.log({ aliceChats })
    // console.log(aliceChats[0].msg)
    return
}

main()