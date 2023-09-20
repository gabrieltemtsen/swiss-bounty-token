import * as dotenv from "dotenv"
import { Wallet, ethers, getDefaultProvider } from "ethers";
import * as hre  from "hardhat";
dotenv.config();

const mumbaiRPC = "https://polygon-mumbai-bor.publicnode.com";

const swisstronikRPC = "https://json-rpc.testnet.swisstronik.com/ ";

const contractAddr = "0xf84Df872D385997aBc28E3f07A2E3cd707c9698a"

const getMessageWithSwisstronik = async () =>{    
       
     // Initialize the provider
  const provider = ethers.getDefaultProvider(swisstronikRPC);
    
    const message = await provider.getStorageAt(contractAddr, 0);

    console.log('getting Message')
    console.log("BYTES: ",message)
    console.log(typeof(message))

    // Check the value of the returned message
const decodedValue = ethers.utils.isBytes(message)

console.log(decodedValue)
// const DecodedMessage = hre.ethers.utils.parseBytes32String(message);

// console.log(DecodedMessage,); 
}



  async function main() {

    await getMessageWithSwisstronik()
    
   
  
   
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });