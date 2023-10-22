import { Flex } from "@chakra-ui/react";
import {
    Area,
    ComposedChart,
    Label,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import useABCGrapthData from "../../hooks/useABCGraphData";


export default function ABCGraph() {
    const maxX = 1000;
    const totalDots = 101;

    const data = useABCGrapthData(maxX, totalDots);

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
                <XAxis dataKey="x" type="number">
                    <Label
                        style={{
                            textAnchor: "middle",
                            fill: "#003C00",
                            fontWeight: "bold",
                        }}
                        value={"Supply"}
                        dy={20} />
                </XAxis>
                <YAxis type="number">
                    <Label
                        style={{
                            textAnchor: "middle",
                            fill: "#003C00",
                            fontWeight: "bold",
                        }}
                        angle={270}
                        value={"Reserve"}
                        dx={-20} />
                </YAxis>
                <Tooltip />
                <Area type="monotone" dataKey="y" stroke="#00E046" strokeLinecap="round" strokeWidth={2} fillOpacity={0.4} fill="url(#colorUv)" />
            </ComposedChart>
        </Flex>
    )
}
