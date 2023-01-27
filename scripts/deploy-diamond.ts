import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { MyDiamond, MyDiamond__factory } from "../typechain-types"

async function deployDiamond(): Promise<MyDiamond> {
    //
    const [deployer]: SignerWithAddress[] = await ethers.getSigners()

    const MyDiamond: MyDiamond__factory = await ethers.getContractFactory("MyDiamond")
    const myDiamond: MyDiamond = await MyDiamond.deploy()
    await myDiamond.deployed()

    console.log("Diamond deployed:", myDiamond.address)
    return myDiamond
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployDiamond().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

export { deployDiamond }
