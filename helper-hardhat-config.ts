import { BigNumber } from "ethers"
import { Address } from "hardhat-deploy/types"

type FacetCutAction = 0 | 1 | 2 //  Add: 0, Replace: 1, Remove: 2

export interface FacetCut {
    target: Address
    action: FacetCutAction
    selectors: string[]
}

// type Facet = { target: string; selectors: string[] }

type NetworkConfigItem = {
    name: string
}

type NetworkConfigMap = {
    [chainId: string]: NetworkConfigItem
}

export const networkConfig: NetworkConfigMap = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    },
    1: {
        name: "mainnet",
    },
    5: {
        name: "goerli",
    },
    137: {
        name: "polygon",
    },
}

export const developmentChains: string[] = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6
