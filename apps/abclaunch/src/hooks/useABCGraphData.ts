import { useReserveInitialBalanceAtom, useInitialTotalSupplyValue, useReserveRatioAtom } from "../store";

const DOTS_LENGTH = 101; // we include the point (0,0) in the data

function bondingCurvePrice(x: number, m: number, n: number, reserveRatio: number) {
    // From price = m * supply ** n; price = reserve / (supply * reserveRatio)
    // If we solve for supply, we get supply = ((m * reserveRatio) / reserve) ^ (1 / (-n - 1))
    // Then we can plug that into the price equation to get price = m * ((m * reserveRatio) / reserve) ^ (-n / (n + 1))
    const price = m * Math.pow(m * reserveRatio / x, (-n / (n + 1)));
    return price;
}

function getBondingCurveData(reserveRatio: number, initialReserve: number, initialSupply: number) {
    var data = [];
    const maxX = initialReserve * 10;

    // reserve ratio must have a value between 0 and 1
    if(reserveRatio < 0 || reserveRatio > 1 || initialSupply === 0) return [];

    const m = initialReserve / (reserveRatio * Math.pow(initialSupply, 1 / reserveRatio)); // slope
    const n = (1 - reserveRatio) / reserveRatio; // exponent

    for (let i = 0; i < DOTS_LENGTH; i++) {
        const x = (maxX / (DOTS_LENGTH - 1)) * i;
        const y = bondingCurvePrice(x, m, n, reserveRatio);
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