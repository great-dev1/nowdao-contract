const { ethers } = require("hardhat");
const {
  BOND_BCV,
  MIN_BOND_PRICE,
  MAX_BOND_PAYOUT,
  BOND_FEE,
  MAX_BOND_DEBT,
  INITIAL_BOND_DEBT,
  BOND_VESTING_LENGTH,
} = require("../utils/bsctest/constants");
const address = require("../utils/bsctest/address.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Bond = await ethers.getContractFactory("NowDaoBondDepository");
  const bond = await Bond.attach(address.NmetaBusdBond);
  console.log("NmetaBusd bond address:", bond.address);

  await bond.initializeBondTerms(
    BOND_BCV,
    MIN_BOND_PRICE,
    MAX_BOND_PAYOUT,
    BOND_FEE,
    MAX_BOND_DEBT,
    INITIAL_BOND_DEBT,
    BOND_VESTING_LENGTH
  );
  console.log("Set NmetaBusd bond terms");

  await bond.setStaking(address.Staking, 0);
  console.log("Set Staking for NmetaBusd bond");

  await bond.setStaking(address.Helper, 1);
  console.log("Set StakingHelper for NmetaBusd bond");

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
