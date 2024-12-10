// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IFairLaunch {
    // Structs
    struct LaunchInfo {
        address tokenAddress;
        uint256 initialPrice;
        uint256 maxTransactionAmount;
        uint256 maxWalletAmount;
        uint256 tradingCooldown;
        uint256 liquidityPercent;
        bool antiBot;
    }

    // Events
    event FairLaunchCreated(address indexed token, uint256 initialPrice, uint256 liquidityPercent);
    event TradingEnabled(uint256 timestamp);
    event LiquidityAdded(uint256 tokenAmount, uint256 ethAmount);
    event AntiSnipeEnabled(uint256 duration);
    event MaxTxAmountUpdated(uint256 amount);

    // Errors
    error TradingNotEnabled();
    error ExceedsMaxTransaction();
    error ExceedsMaxWallet();
    error CooldownActive();
    error InvalidLiquidityPercent();
}