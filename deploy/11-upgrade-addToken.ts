import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

import { getNamedAccounts, deployments, network, ethers } from "hardhat"
import { FacetCut } from "../helper-hardhat-config"
import { getSelectors } from "../helper-functions"

// let iface: AavegotchiFacetInterface = new ethers.utils.Interface(
//     AavegotchiFacet__factory.abi
//   ) as AavegotchiFacetInterface;

/* 
struct FacetCut {
    address target;
    FacetCutAction action;
    bytes4[] selectors;
} 
*/

const functionsToAdd = [
    "function name()",
    "function symbol()",
    "function decimals()",
    "function balanceOf(address)",
    "function transfer(address,uint256)",
    "function mint(address,uint256)",
    "function burn(uint256)",
]

const upgradeToken: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    // code here

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const diamond = await ethers.getContract("MyDiamond", deployer)
    const token = await ethers.getContract("CustomToken", deployer)

    let facetCuts: FacetCut[] = [] // array of structured Diamond facet update data
    const initTarget = ethers.constants.AddressZero // optional target of initialization delegatecall
    const initData = "0x" // optional initialization function call data

    const selectors = getSelectors(functionsToAdd)
    const facetCut: FacetCut = {
        target: token.address,
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
upgradeToken.tags = [`all`, `token`, "diamondcut"]
