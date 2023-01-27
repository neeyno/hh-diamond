import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

import { getNamedAccounts, deployments, network, ethers } from "hardhat"

const deployNFT: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    // code here

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const nft = await deploy("CustomNFT", {
        contract: "CustomNFT",
        from: deployer,
        log: true,
        args: [],
    })

    log(`----------------------------------------------------`)
}

export default deployNFT
deployNFT.tags = [`all`, `nft`, "facet"]
