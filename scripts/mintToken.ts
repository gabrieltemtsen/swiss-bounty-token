import * as dotenv from "dotenv"
import * as hre  from "hardhat";
dotenv.config();

import { encryptDataField, decryptNodeResponse } from "@swisstronik/swisstronik.js";

const sendShieldedTransaction = async (signer: any, destination: any, data: any, value: any) => {
    // Get the RPC link from the network configuration
    const rpclink = hre.network.config.url;

  
    // Encrypt transaction data
    const [encryptedData] = await encryptDataField(rpclink, data);
    console.log('here')
  
    // Construct and sign transaction with encrypted data
    return await signer.sendTransaction({
      from: signer.address,
      to: destination,
      data: encryptedData,
      value,
    });
  };

  async function main() {
    console.log('Minting Token please Wait')
    // Address of the deployed contract
    const contractAddress = "0x64A9E8425f8a219B5D0a843c531CFa2D2fA891D8";

    
  
    // Get the signer (your account)
    const privateKey = process.env.PRIVATE_KEY;

  // Create a wallet instance using the private key
  const wallet = new hre.ethers.Wallet(privateKey || '', hre.ethers.provider);

  const signer = wallet.connect(hre.ethers.provider);

    // Construct a contract instance
    const contractFactory = await hre.ethers.getContractFactory("BountyToken");
    const contract = contractFactory.attach(contractAddress);

  
    // Send a shielded transaction to set a message in the contract
    const mint = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData("mint", [100]), 0);

    console.log("MINT:::", mint)
    await mint.wait();
  
    //It should return a TransactionResponse object
    console.log("Transaction Receipt: ", mint);
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });