import { parseAbi } from 'viem';
import { useAccount } from 'wagmi';

export default function useSwapSteps(bondingCurve: `0x${string}`, reserveToken: `0x${string}`, forwards: boolean, amount: bigint) {

    const { address } = useAccount();

    const minAmount = 0n// amount - (5n * amount / 100n); // 5% slippage

    return forwards ?
        [
            {
                title: 'Raise approval',
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
                title: 'Make buy order',
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
                title: 'Make sell order',
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