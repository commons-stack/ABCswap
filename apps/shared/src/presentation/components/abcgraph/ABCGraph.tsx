import { CSSProperties, useEffect, useState } from 'react';
import { Line, LineChart, XAxis, YAxis , CartesianGrid} from 'recharts';
import "./abcgraph.css";

type ABCGraphProps  = {
    reserveRatio?: number;
    reserveInitialBalance?: number;
    style? : CSSProperties;
};

export default function ABCGraph({ reserveRatio, reserveInitialBalance, style }: ABCGraphProps) {

    const [data, setData] = useState<any[]>([])

    const abcFunction = (x: number) : number => {
        if(x == 0) return 0;
        const result = Math.log10(x)*10;
        return result;
    }

    useEffect(() => {
        const newData : any[] = [];

        const maxValue = 100;
        const unitSteps = 10;

        for (let i = unitSteps; i < maxValue*unitSteps; i++) {
            const x = i/unitSteps;
            let d = {
              x: x,
              y: abcFunction(x)
            };
          
            newData.push(d);
        }

        setData(newData);
    }, [reserveRatio, reserveInitialBalance]);

    if(!reserveRatio || !reserveInitialBalance) {
        return (
            <div style={style}></div>
        )
    }
    return (
        <div style={style}>
            <LineChart
                width={400}
                height={400}
                data={data}
            >
                <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
                <XAxis dataKey="x" />
                <YAxis />
            </LineChart>
        </div>
    )
}

