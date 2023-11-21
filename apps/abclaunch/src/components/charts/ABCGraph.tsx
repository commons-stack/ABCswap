import { Flex } from "@chakra-ui/react";
import {
    Area,
    ComposedChart,
    Label,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import useABCGraphData from "../../hooks/useABCGraphData";
import { getCollateralTokenInfo } from "../../utils/token-info";
import { useCallback } from "react";
import { useCollateralTokenAtom, useTokenSymbolAtom, useReserveRatioAtom } from "../../store";

const tickFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
}).format

const tooltipFormatter = new Intl.NumberFormat("en-US", {
    notation: "standard",
    minimumSignificantDigits: 5,
    maximumSignificantDigits: 5,
}).format

function CustomTooltip({ active, supply, reserve, price, tokenSymbol, reserveTokenSymbol }: { active?: boolean, supply?: number, reserve?: number, price?: number, tokenSymbol?: string, reserveTokenSymbol?: string }) {
    if (active && supply && reserve && price) {
        return (
            <div
                style={{
                    color: "#E8E9E3",
                    background: "#003C00",
                    padding: "10px",
                    borderRadius: "4px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                }}
            >
                <p style={{ color: "#E8E9E3" }}>
                    <b>Reserve:</b> {tooltipFormatter(reserve)} {reserveTokenSymbol}
                </p>
                <p style={{ color: "#E8E9E3" }}>
                    <b>Price:</b> {tooltipFormatter(price)} {reserveTokenSymbol}/token
                </p>
                <p>
                    <b>Supply:</b> {tooltipFormatter(supply)} {tokenSymbol}
                </p>
            </div>
        );
    }
    return null;
};

export default function ABCGraph() {

    const data = useABCGraphData();
    const [tokenSymbol] = useTokenSymbolAtom();
    const [collateralToken] = useCollateralTokenAtom();
    const [reserveRatio] = useReserveRatioAtom();

    const reserveTokenSymbol = getCollateralTokenInfo(collateralToken)?.tokenSymbol;

    const tooltip = useCallback(({ active, payload, label }: { active?: boolean, payload?: any, label?: any }) => {
        const reserve = label;
        const price = payload?.[0]?.payload?.y;
        const supply = Number(reserve) / Number(price) / Number(reserveRatio) * 100
        return (
            <CustomTooltip
                active={active}
                supply={supply}
                reserve={reserve}
                price={price}
                tokenSymbol={tokenSymbol}
                reserveTokenSymbol={reserveTokenSymbol} />
        )
    }, [tokenSymbol, reserveTokenSymbol, reserveRatio]);

    return (
        <Flex w="100%" h="100%">
            <ComposedChart
                data={data}
                width={600}
                height={400}
                margin={{
                    top: 20,
                    left: 20,
                    bottom: 20,
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="10%" stopColor="#00E046" stopOpacity={1} />
                        <stop offset="95%" stopColor="#003C00" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="x" type="number" tickFormatter={tickFormatter}>
                    <Label
                        style={{
                            textAnchor: "middle",
                            fill: "#003C00",
                            fontWeight: "bold",
                        }}
                        // value={"Supply" + (tokenSymbol ? ` (${tokenSymbol})` : "")}
                        value={"Reserve balance" + (reserveTokenSymbol ? ` (${reserveTokenSymbol})` : "")}
                        dy={20} />
                </XAxis>
                <YAxis type="number" tickFormatter={tickFormatter}>
                    <Label
                        style={{
                            textAnchor: "middle",
                            fill: "#003C00",
                            fontWeight: "bold",
                        }}
                        angle={270}
                        value={"Price per token" + (reserveTokenSymbol ? ` (${reserveTokenSymbol})` : "")}
                        dx={-30} />
                </YAxis>
                <Tooltip content={tooltip} />
                <Area type="monotone" dataKey="y" stroke="#00E046" strokeLinecap="round" strokeWidth={2} fillOpacity={0.4} fill="url(#colorUv)" unit={'USDC'} />
            </ComposedChart>
        </Flex>
    )
}

