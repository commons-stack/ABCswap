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
                        'function makeBuyOrder(address _buyer, address _collateralToken, uint256 _collateralAmount, uint256 _minReturn) external returns (uint256 amount)'
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
                        'function makeSellOrder(address _seller, address _collateralToken, uint256 _abcAmount, uint256 _minReturn) external returns (uint256 amount)'
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