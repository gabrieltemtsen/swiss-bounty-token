import * as dotenv from "dotenv"
import * as hre  from "hardhat";
dotenv.config();

const initialSupply = 100

async function main() {
  
  // here we deploy the contract
 const BountyTokenContract = await hre.ethers.deployContract("BountyToken", [initialSupply]);

  await BountyTokenContract.waitForDeployment();

 // print the address of the deployed contract
  console.log("BountyToken Contract Address:", BountyTokenContract.target);

  // console.log("Sleeping.....");
  // // Wait for etherscan to notice that the contract has been deployed
  // await sleep(30000);

  // // Verify the contract after deploying
  // await hre.run("verify:verify", {
  //   address: BountyTokenContract.target,
  //   constructorArguments: [initialSupply],
  // });
}
function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});