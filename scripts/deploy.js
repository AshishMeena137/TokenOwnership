const hre = require("hardhat");

async function main() {

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy();

  await myToken.deployed();

  console.log(
    "contract address :",myToken.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
