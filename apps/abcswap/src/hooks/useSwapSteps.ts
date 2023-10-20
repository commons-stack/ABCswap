import { parseAbi } from 'viem';
import { useAccount } from 'wagmi';

export default function useSwapSteps(bondingCurve: `0x${string}` | undefined, reserveToken: `0x${string}`| undefined, forwards: boolean, amount: bigint | undefined) {

    const { address } = useAccount();

    if (!bondingCurve || !reserveToken || !amount) return [];


    // TODO: Use the amount to calculate the minAmount
    const minAmount = 0n// amount - (5n * amount / 100n); // 5% slippage

    return forwards ?
        [
            {
                title: 'Approve Spending',
                data: {
                    address: reserveToken,
                    abi: parseAbi([
                        'function approve(address _spender, uint256 _value) public returns (bool success)'
                    ]),
                    functionName: 'approve',
                    args: [
                        bondingCurve,
                        amount
                    ]
                }
            },
            {
                title: 'Swap Tokens',
                data: {
                    address: bondingCurve,
                    abi: parseAbi([
                        'function makeBuyOrder(address _onBehalfOf, address _collateral, uint256 _depositAmount, uint256 _minReturnAmountAfterFee)'
                    ]),
                    functionName: 'makeBuyOrder',
                    args: [
                        address,
                        reserveToken,
                        amount,
                        minAmount
                    ],
                }
            }
        ] : [
            {
                title: 'Swap Tokens',
                data: {
                    address: bondingCurve,
                    abi: parseAbi([
                        'function makeSellOrder(address _onBehalfOf, address _collateral, uint256 _sellAmount, uint256 _minReturnAmountAfterFee)'
                    ]),
                    functionName: 'makeSellOrder',
                    args: [
                        address,
                        reserveToken,
                        amount,
                        minAmount
                    ],
                    gasLimit: 100000000n
                }
            }
        ];
    }