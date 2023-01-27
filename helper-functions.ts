import { network, run } from "hardhat"
//import { networkConfig } from "./helper-hardhat-config"
//import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber, constants, ethers } from "ethers"

export const getSelectors = function (functions: string[]): string[] {
    const selectors = functions.map((val) => {
        const abiInterface = new ethers.utils.Interface([val])
        return abiInterface.getSighash(ethers.utils.Fragment.from(val))
    })
    return selectors
}

export const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}
