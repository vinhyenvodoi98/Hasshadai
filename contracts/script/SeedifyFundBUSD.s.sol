// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {SeedifyLaunchpad} from "../contracts/SeedifyFund/SeedifyFundBUSD.sol";

contract SeedifyBUSDScript is Script {
    function setUp() public {}

    function run() public {
        address payable deployerAddr = payable(0xf98f95d1Fa6a8a26efc15519Fac39754311B7a4A);
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        SeedifyLaunchpad seedify = new SeedifyLaunchpad(
            "seedify", 100, block.timestamp + 10, block.timestamp + 100, 3, deployerAddr, address(1), 10, 1
        );

        vm.stopBroadcast();
    }
}
