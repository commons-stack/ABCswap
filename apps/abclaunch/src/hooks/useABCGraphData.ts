import { useRecoilValue } from "recoil";
import { newDaoAbcState, newDaoTokenState } from "../recoil";


export default function useABCGrapthData(maxX: number, totalDots: number) {
    const tokenSettings = useRecoilValue(newDaoTokenState)
    const abcSettings = useRecoilValue(newDaoAbcState);

    function bondingCurvePrice(x: number, m: number, n: number) {
        const price = m * Math.pow(x, n);
        return price;
    }

    function getBondingCurveData(reserveRatio: number, initialReserve: number, initialTokens: number, maxX: number, totalDots: number) {
        var data = [];

        // reserve ratio must have a value between 0 and 1
        if(reserveRatio < 0 || reserveRatio > 1) return [{x: 0, y:NaN,}, {x:maxX, y: NaN}];

        const m = initialReserve / (reserveRatio * Math.pow(initialTokens, 1 / reserveRatio)); // slope
        const n = (1 - reserveRatio) / reserveRatio; // exponent

        for (let i = 0; i < totalDots; i++) {
            const x = (maxX / (totalDots - 1)) * i;
            const fx = bondingCurvePrice(x, m, n);
            data.push({
                y: fx,
                x: x
            });
        }
        return data;
    }

    const tokens = tokenSettings.tokenHolders.reduce((result, current) => { return result + Number.parseInt(current[1]) }, 0);
    const initialReserve = Number.parseFloat(abcSettings.reserveInitialBalance);
    const reserveRatio = Number.parseFloat(abcSettings.reserveRatio) / 100;
    return getBondingCurveData(reserveRatio, initialReserve, tokens, maxX, totalDots);
}