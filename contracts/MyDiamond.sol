// SPDX-License-Identifier: MIT

pragma solidity =0.8.17;

import {AppStorage} from "./libraries/AppStorage.sol";
import {SolidStateDiamond} from "@solidstate/contracts/proxy/diamond/SolidStateDiamond.sol";

contract MyDiamond is SolidStateDiamond {}
