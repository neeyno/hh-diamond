// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

import {SolidStateERC721} from "@solidstate/contracts/token/ERC721/SolidStateERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {AppStorage} from "../libraries/AppStorage.sol";

contract CustomNFT is SolidStateERC721 {
    using Strings for uint256;

    function mintNft() external {
        AppStorage.Layout storage l = AppStorage.layout();
        uint256 newTokenId = l.tokenID;
        l.tokenID += 1;
        _mint(msg.sender, newTokenId);
    }

    function _tokenURI(
        uint256 tokenId
    ) internal view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert ERC721Metadata__NonExistentToken();
        string memory basePrefix = ":Diamond NFT id: ";
        return string(abi.encodePacked(basePrefix, tokenId.toString()));
    }
}
