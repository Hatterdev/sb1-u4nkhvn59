// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IPresale.sol";

contract Presale is IPresale, ReentrancyGuard, Pausable, Ownable {
    PresaleInfo public presaleInfo;
    VestingSchedule public vestingSchedule;
    
    mapping(address => bool) public whitelist;
    mapping(address => uint256) public contributions;
    mapping(address => uint256) public tokensClaimed;
    
    uint256 public totalContributed;
    bool public emergencyWithdrawEnabled;
    
    constructor(
        address _token,
        uint256 _tokenPrice,
        uint256 _softCap,
        uint256 _hardCap,
        uint256 _minContribution,
        uint256 _maxContribution,
        uint256 _startTime,
        uint256 _endTime,
        bool _isWhitelisted,
        VestingSchedule memory _vestingSchedule
    ) {
        presaleInfo = PresaleInfo({
            tokenAddress: _token,
            tokenPrice: _tokenPrice,
            softCap: _softCap,
            hardCap: _hardCap,
            minContribution: _minContribution,
            maxContribution: _maxContribution,
            startTime: _startTime,
            endTime: _endTime,
            isWhitelisted: _isWhitelisted,
            isPaused: false
        });
        
        vestingSchedule = _vestingSchedule;
        
        emit PresaleCreated(_token, _tokenPrice, _softCap, _hardCap);
    }
    
    function contribute() external payable nonReentrant whenNotPaused {
        if (block.timestamp < presaleInfo.startTime || block.timestamp > presaleInfo.endTime) {
            revert PresaleNotActive();
        }
        
        if (presaleInfo.isWhitelisted && !whitelist[msg.sender]) {
            revert NotWhitelisted();
        }
        
        if (msg.value < presaleInfo.minContribution) {
            revert ContributionTooLow();
        }
        
        if (contributions[msg.sender] + msg.value > presaleInfo.maxContribution) {
            revert ContributionTooHigh();
        }
        
        if (totalContributed + msg.value > presaleInfo.hardCap) {
            revert HardCapReached();
        }
        
        contributions[msg.sender] += msg.value;
        totalContributed += msg.value;
        
        emit ContributionMade(msg.sender, msg.value);
    }
    
    function updateWhitelist(address[] calldata users, bool status) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            whitelist[users[i]] = status;
            emit WhitelistUpdated(users[i], status);
        }
    }
    
    function pause() external onlyOwner {
        _pause();
        presaleInfo.isPaused = true;
        emit PresalePaused(true);
    }
    
    function unpause() external onlyOwner {
        _unpause();
        presaleInfo.isPaused = false;
        emit PresalePaused(false);
    }
    
    function emergencyWithdraw() external nonReentrant {
        if (!emergencyWithdrawEnabled) {
            revert EmergencyWithdrawDisabled();
        }
        
        uint256 amount = contributions[msg.sender];
        if (amount > 0) {
            contributions[msg.sender] = 0;
            totalContributed -= amount;
            payable(msg.sender).transfer(amount);
            emit EmergencyWithdraw(msg.sender, amount);
        }
    }
    
    function enableEmergencyWithdraw() external onlyOwner {
        emergencyWithdrawEnabled = true;
    }
}