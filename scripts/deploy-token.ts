import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
//const { getSelectors, FacetCutAction } = require("./libraries/diamond.ts");

import { CustomToken, CustomToken__factory } from "../typechain-types"

async function deployToken() {
    const [deployer]: SignerWithAddress[] = await ethers.getSigners()
    const Token: CustomToken__factory = await ethers.getContractFactory(
        "CustomToken"
    )
    const token: CustomToken = await Token.deploy()
    await token.deployed()

    console.log("Token deployed:", token.address)

    // upgrade diamond with token facets
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployToken().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
