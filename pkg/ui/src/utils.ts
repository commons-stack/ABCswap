export function formatWithFixedDecimals(value: string, fixedDecimals: number) {
    let display = value.toString()

    const negative = display.startsWith('-')
    if (negative) display = display.slice(1)

    let [integer, fraction] = [
        display.split('.')[0],
        display.split('.')[1] || ''
    ]
    fraction = fraction.padEnd(fixedDecimals, '0')
    fraction = fraction.slice(0, fixedDecimals)
    return `${negative ? '-' : ''}${integer || '0'}${`.${fraction}`}`
}
