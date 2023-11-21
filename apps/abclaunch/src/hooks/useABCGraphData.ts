import { useDao } from "dao-utils";
import { useReserveInitialBalanceAtom, useInitialTotalSupplyValue, useReserveRatioAtom } from "../store";

const DOTS_LENGTH = 101; // we include the point (0,0) in the data

function bondingCurvePrice(x: number, m: number, n: number) {
    const price = m * Math.pow(x, n);
    return price;
}

function getBondingCurveData(reserveRatio: number, initialReserve: number, initialSupply: number) {
    var data = [];
    const maxX = initialSupply * 4;

    // reserve ratio must have a value between 0 and 1
    if(reserveRatio < 0 || reserveRatio > 1 || initialSupply === 0) return [];

    const m = initialReserve / (reserveRatio * Math.pow(initialSupply, 1 / reserveRatio)); // slope
    const n = (1 - reserveRatio) / reserveRatio; // exponent

    for (let i = 0; i < DOTS_LENGTH; i++) {
        const x = (maxX / (DOTS_LENGTH - 1)) * i;
        const y = bondingCurvePrice(x, m, n);
        data.push({ x, y });
    }
    return data;
}

export default function useABCGraphData(): {x: number, y: number}[] {
    const tokenSupply = Number.parseFloat(useInitialTotalSupplyValue());
    const initialReserve = Number.parseFloat(useReserveInitialBalanceAtom()[0][0]);
    const reserveRatio = Number.parseFloat(useReserveRatioAtom()[0]) / 100;
    return getBondingCurveData(reserveRatio, initialReserve, tokenSupply);
}