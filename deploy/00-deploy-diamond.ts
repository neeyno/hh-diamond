import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

import { getNamedAccounts, deployments, network, ethers } from "hardhat"
//import { MyDiamond, MyDiamond__factory } from "../typechain-types"

const deployDiamond: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    // code here

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const myDiamond = await deploy("MyDiamond", {
        contract: "MyDiamond",
        from: deployer,
        log: true,
        args: [],
    })

    log(`----------------------------------------------------`)
}

export default deployDiamond
deployDiamond.tags = [`all`, `diamond`]
