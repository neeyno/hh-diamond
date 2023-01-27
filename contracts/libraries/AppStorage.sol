// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library AppStorage {
    bytes32 internal constant STORAGE_SLOT =
        keccak256("MyDiamond.contracts.storage.AppStorage0");

    string internal constant TOKEN_NAME = "Diamond Token";
    string internal constant TOKEN_SYMBOL = "DTKN";
    uint8 internal constant TOKEN_DECIMALS = 18;

    struct Layout {
        uint256 tokenID;
    }

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
// struct Layout {
//     uint256 tokenID;
//     uint256 totalSupply;
//     mapping(address => uint256) balances; // erc20 balances
//     mapping(address => mapping(address => uint256)) allowances;
// }

// library LibAppStorage {
//     function diamondStorage() internal pure returns (AppStorage storage ds) {
//         assembly {
//             ds.slot := 0
//         }
//     }
// }
