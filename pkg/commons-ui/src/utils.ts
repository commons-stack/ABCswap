function parseNumber(value: string) : {isNegative: Boolean, integer: string, fraction: string}{
    const positive = value.startsWith('-');
    let [integer, fraction] = [
        value.split('.')[0],
        value.split('.')[1] || ''
    ] 
    return {isNegative: positive, integer: integer, fraction: fraction}
}

export function formatWithFixedDecimals(value: string, fixedDecimals: number) {
    let {isNegative, integer, fraction} = parseNumber(value);
    fraction = fraction.padEnd(fixedDecimals, '0')
    fraction = fraction.slice(0, fixedDecimals)
    return `${isNegative ? '-' : ''}${integer || '0'}${`.${fraction}`}`
}

export function formatWithMaxDecimals(value: string, maxDecimals: number) {
    let {isNegative, integer, fraction} = parseNumber(value);
    fraction = fraction.slice(0, maxDecimals)
    return `${isNegative ? '-' : ''}${integer || '0'}${fraction.length>0?`.${fraction}`:''}`
}

export function trimDecimals(value: string, maxDecimals: number) {
    let {isNegative, integer, fraction} = parseNumber(value);
    fraction = fraction.slice(0, maxDecimals)
    let hasDecimalSeparator = value.includes('.');
    return `${isNegative ? '-' : ''}${integer || '0'}${hasDecimalSeparator?'.':''}${`${fraction}`}`
}