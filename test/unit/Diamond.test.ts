import { expect, assert } from "chai"
import { ethers, deployments, network } from "hardhat"
// import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { MyDiamond } from "../../typechain-types"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Diamond unit test", function () {
          let [deployer, player]: SignerWithAddress[] = []
          let myDiamond: MyDiamond

          before(async () => {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              player = accounts[1]
          })

          beforeEach(async function () {
              await deployments.fixture("diamond")
              myDiamond = await ethers.getContract("MyDiamond")
          })

          //   async function deploy() {
          //       await deployments.fixture("diamond")
          //       const myDiamond = await ethers.getContract("MyDiamond")
          //       return { myDiamond, deployer }
          //   }

          it("deploys", async function () {
              expect(myDiamond.address).to.be.properAddress
          })

          it("sets the contract owner", async function () {
              expect(await myDiamond.owner()).to.eq(deployer.address)
              expect(await myDiamond.nomineeOwner()).to.eq(
                  ethers.constants.AddressZero
              )
          })

          it("sets the initial selectors", async function () {
              const facets = await myDiamond.facets()

              const facetAddress = facets[0][0]
              const facetSelectors = facets[0][1]

              //assert.equal(facets.length, 1)
              expect(facets.length).to.equal(1)

              expect(facetAddress).to.equal(myDiamond.address)
              expect(facetSelectors).to.equal(12)
          })
      })
