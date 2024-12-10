// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPresale {
    // Structs
    struct PresaleInfo {
        address tokenAddress;
        uint256 tokenPrice;
        uint256 softCap;
        uint256 hardCap;
        uint256 minContribution;
        uint256 maxContribution;
        uint256 startTime;
        uint256 endTime;
        bool isWhitelisted;
        bool isPaused;
    }

    struct VestingSchedule {
        uint256 tgePercent;
        uint256 vestingDuration;
        uint256 vestingInterval;
    }

    // Events
    event PresaleCreated(address indexed token, uint256 tokenPrice, uint256 softCap, uint256 hardCap);
    event ContributionMade(address indexed contributor, uint256 amount);
    event WhitelistUpdated(address indexed user, bool status);
    event PresalePaused(bool isPaused);
    event EmergencyWithdraw(address indexed user, uint256 amount);
    event TokensClaimed(address indexed user, uint256 amount);

    // Errors
    error PresaleNotActive();
    error ContributionTooLow();
    error ContributionTooHigh();
    error HardCapReached();
    error NotWhitelisted();
    error InvalidVestingSchedule();
    error EmergencyWithdrawDisabled();
}