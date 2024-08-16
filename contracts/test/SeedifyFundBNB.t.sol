// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import {SeedifyFundsContract} from "../contracts/SeedifyFund/SeedifyFundBNB.sol";

contract SeedifyFundsTest is Test {
    SeedifyFundsContract public seedify;
    address payable deployer = payable(0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84);

    function setUp() public {
        seedify = new SeedifyFundsContract(
            100,
            block.timestamp + 10,
            block.timestamp + 100,
            deployer,
            10,
            1,
            0,
            0,
            0,
            0,
            0,
            // 0,
            // 0,
            10
        );
    }

    function test_maxCap() public view {
        assertEq(seedify.maxCap(), 100);
    }
}
