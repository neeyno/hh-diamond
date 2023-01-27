import { HardhatRuntimeEnvironment } from "hardhat/types"
import { Address, DeployFunction } from "hardhat-deploy/types"

import { getNamedAccounts, deployments, network, ethers } from "hardhat"
import { FacetCut } from "../helper-hardhat-config"
import { getSelectors } from "../helper-functions"

const functionsToAdd = [
    "function mintNft()",
    "function ownerOf(uint256)",
    "function safeTransferFrom(address,address,uint256)",
    "function safeTransferFrom(address,address,uint256,bytes)",
    "function approve(address, uint256)",
    "function getApproved(uint256)",
]

const upgradeToken: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    // code here

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const diamond = await ethers.getContract("MyDiamond", deployer)
    const nft = await ethers.getContract("CustomNFT", deployer)

    let facetCuts: FacetCut[] = [] // array of structured Diamond facet update data
    const initTarget = ethers.constants.AddressZero //optional target of initialization delegatecall
    const initData = "0x" // optional initialization function call data

    const selectors = getSelectors(functionsToAdd)
    const facetCut: FacetCut = {
        target: nft.address,
        action: 0,
        selectors: selectors,
    }

    log(selectors)

    facetCuts.push(facetCut)

    const upgradeTx = await diamond.diamondCut(facetCuts, initTarget, initData)
    await upgradeTx.wait()

    log(`----------------------------------------------------`)
}

export default upgradeToken
upgradeToken.tags = [`all`, `nft`, "diamondcut"]
