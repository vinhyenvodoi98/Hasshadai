// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Launchpad/LaunchpadToken.sol";

contract LaunchpadFactory is Ownable {
    address[] public allLaunchpads;

    function getAllLaunchpadsLength() external view returns (uint256) {
        return allLaunchpads.length;
    }
    address public implementationContract;
    event LaunchpadDeployed(address proxy, string name, address projectOwner);

    constructor(address _implementation) {
        implementationContract = _implementation;
    }

    function updateImplementation(address _implementation) external {
        implementationContract = _implementation;
    }

    function deployClone(
        string memory _name,
        uint256 _maxCap,
        uint256 _saleStart,
        uint256 _saleEnd,
        uint256 _noOfTiers,
        address _projectOwner,
        address _tokenAddress,
        uint8 _phaseNo
    ) external returns (address) {
        bytes20 implementationContractInBytes = bytes20(implementationContract);

        address proxy;
        assembly {
            let clone := mload(0x40)
            mstore(
                clone,
                0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000
            )
            mstore(add(clone, 0x14), implementationContractInBytes)
            mstore(
                add(clone, 0x28),
                0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000
            )
            proxy := create(0, clone, 0x37)
        }

        LaunchpadERC20(proxy).initialize(
            _name,
            _maxCap,
            _saleStart,
            _saleEnd,
            _noOfTiers,
            _projectOwner,
            _tokenAddress,
            _phaseNo
        );
        allLaunchpads.push(proxy);

        emit LaunchpadDeployed(proxy, _name, _projectOwner);
        return proxy;
    }

    error Create2EmptyBytecode();

    error Create2FailedDeployment();

    function deployWithCreate2(
        string memory _name,
        uint256 _maxCap,
        uint256 _saleStart,
        uint256 _saleEnd,
        uint256 _noOfTiers,
        address _projectOwner,
        address _tokenAddress,
        uint8 _phaseNo
    ) external payable returns (address launchpad) {
        bytes memory bytecode = type(LaunchpadERC20).creationCode;
        bytes32 salt = keccak256(
            abi.encodePacked(
                _name,
                _maxCap,
                _saleStart,
                _saleEnd,
                _noOfTiers,
                _projectOwner,
                _tokenAddress,
                _phaseNo
            )
        );
        assembly {
            launchpad := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        LaunchpadERC20(launchpad).initialize(
            _name,
            _maxCap,
            _saleStart,
            _saleEnd,
            _noOfTiers,
            _projectOwner,
            _tokenAddress,
            _phaseNo
        );
        allLaunchpads.push(launchpad);

        emit LaunchpadDeployed(launchpad, _name, _projectOwner);
        return launchpad;
    }
}
