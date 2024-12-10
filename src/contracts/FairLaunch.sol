// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IFairLaunch.sol";
import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IUniswapV2Factory.sol";

contract FairLaunch is IFairLaunch, ReentrancyGuard, Ownable {
    LaunchInfo public launchInfo;
    
    IUniswapV2Router02 public immutable router;
    address public pair;
    
    uint256 public launchTime;
    bool public tradingEnabled;
    mapping(address => bool) public isExcluded;
    
    constructor(
        address _token,
        address _router,
        uint256 _initialPrice,
        uint256 _maxTransactionAmount,
        uint256 _maxWalletAmount,
        uint256 _tradingCooldown,
        uint256 _liquidityPercent
    ) {
        if (_liquidityPercent > 100) {
            revert InvalidLiquidityPercent();
        }
        
        launchInfo = LaunchInfo({
            tokenAddress: _token,
            initialPrice: _initialPrice,
            maxTransactionAmount: _maxTransactionAmount,
            maxWalletAmount: _maxWalletAmount,
            tradingCooldown: _tradingCooldown,
            liquidityPercent: _liquidityPercent,
            antiBot: true
        });
        
        router = IUniswapV2Router02(_router);
        
        emit FairLaunchCreated(_token, _initialPrice, _liquidityPercent);
    }
    
    function launch() external onlyOwner nonReentrant {
        require(!tradingEnabled, "Already launched");
        
        IERC20 token = IERC20(launchInfo.tokenAddress);
        uint256 tokenBalance = token.balanceOf(address(this));
        
        uint256 liquidityTokens = (tokenBalance * launchInfo.liquidityPercent) / 100;
        
        // Approve router
        token.approve(address(router), liquidityTokens);
        
        // Add liquidity
        router.addLiquidityETH{value: address(this).balance}(
            launchInfo.tokenAddress,
            liquidityTokens,
            0,
            0,
            owner(),
            block.timestamp
        );
        
        // Create pair
        IUniswapV2Factory factory = IUniswapV2Factory(router.factory());
        pair = factory.getPair(launchInfo.tokenAddress, router.WETH());
        
        tradingEnabled = true;
        launchTime = block.timestamp;
        
        emit TradingEnabled(launchTime);
        emit LiquidityAdded(liquidityTokens, address(this).balance);
    }
    
    function setAntiBot(bool enabled) external onlyOwner {
        launchInfo.antiBot = enabled;
    }
    
    function excludeFromLimits(address account, bool excluded) external onlyOwner {
        isExcluded[account] = excluded;
    }
    
    function updateMaxTxAmount(uint256 amount) external onlyOwner {
        launchInfo.maxTransactionAmount = amount;
        emit MaxTxAmountUpdated(amount);
    }
    
    receive() external payable {}
}