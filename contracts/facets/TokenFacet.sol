// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

import {SolidStateERC20} from "@solidstate/contracts/token/ERC20/SolidStateERC20.sol";
import {AppStorage} from "../libraries/AppStorage.sol";

contract CustomToken is SolidStateERC20 {
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    /**
     * @notice overrides ERC20MetadataInternal _name()
     */
    function _name() internal pure override returns (string memory) {
        return AppStorage.TOKEN_NAME;
    }

    /**
     * @notice overrides ERC20MetadataInternal _symbol()
     */
    function _symbol() internal pure override returns (string memory) {
        return AppStorage.TOKEN_SYMBOL;
    }

    /**
     * @notice overrides ERC20MetadataInternal _decimals()
     */
    function _decimals() internal pure override returns (uint8) {
        return AppStorage.TOKEN_DECIMALS;
    }
}
