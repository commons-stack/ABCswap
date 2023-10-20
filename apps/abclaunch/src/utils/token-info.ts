class TokenInfo {
    constructor(public tokenName: string, public tokenSymbol: string, public tokenAddress: string, public tokenIcon: string, public decimals: number) {}
}

export const collateralTokenList = [
    new TokenInfo("Optimism", "OP", "0x4200000000000000000000000000000000000042", "/token-icons/op-icon.svg", 18),
    new TokenInfo("USDT", "USDT", "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58", "/token-icons/usdt-icon.svg", 6),
    new TokenInfo("DAI", "DAI", "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1", "/token-icons/dai-icon.svg", 18),
    new TokenInfo("USDC", "USDC", "0x7f5c764cbc14f9669b88837ca1490cca17c31607", "/token-icons/usdc-icon.svg", 6),
    new TokenInfo("GIV", "GIV", "0x528cdc92eab044e1e39fe43b9514bfdab4412b98", "/token-icons/giv-icon.png", 18),
];

export function getCollateralTokenInfo(tokenAddress?: string): TokenInfo | undefined {
    return collateralTokenList.find(token => token.tokenAddress === tokenAddress);
}
