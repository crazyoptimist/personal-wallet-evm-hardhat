// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vault is Ownable {
    using SafeERC20 for IERC20;

    constructor() Ownable(msg.sender) {}

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{
            value: address(this).balance
        }("");
        require(success, "ETH withdrawal failed");
    }

    function withdrawTo(address _to) external onlyOwner {
        (bool success, ) = payable(_to).call{ value: address(this).balance }(
            ""
        );
        require(success, "ETH withdrawal(to) failed");
    }

    function sendETH(uint256 _amount, address _to) external onlyOwner {
        require(
            address(this).balance > _amount,
            "Insufficient balance for sendETH"
        );

        (bool success, ) = payable(_to).call{ value: _amount }("");
        require(success, "Sending ETH failed");
    }

    function withdrawToken(address _token) external onlyOwner {
        uint256 tokenBalance = IERC20(_token).balanceOf(address(this));
        IERC20(_token).safeTransfer(owner(), tokenBalance);
    }

    function sendToken(
        address _token,
        uint256 _amount,
        address _to
    ) external onlyOwner {
        uint256 tokenBalance = IERC20(_token).balanceOf(address(this));
        require(tokenBalance > _amount, "Insufficient token balance");

        IERC20(_token).safeTransfer(_to, _amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getTokenBalance(address _token) public view returns (uint) {
        return IERC20(_token).balanceOf(address(this));
    }

    receive() external payable {}

    fallback() external payable {}
}
