// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import {SeedifyLaunchpad} from "../contracts/SeedifyFund/SeedifyFundBUSD.sol";

contract SeedifyFundsTest is Test {
    SeedifyLaunchpad public seedify;
    address payable deployer = payable(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);

    function setUp() public {
        seedify = new SeedifyLaunchpad(
            "seedify", 100, block.timestamp + 10, block.timestamp + 100, 3, deployer, address(1), 10, 1
        );
    }

    function test_maxCap() public view {
        assertEq(seedify.maxCap(), 100);
    }
}
