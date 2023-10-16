const Tooltip = {
    variants: {
        "solid": (_: AsyncGeneratorFunctionConstructor) => ({
            background: "brand.900",
            padding: "16px",
            color: "white",
        }),
    },
    defaultProps: {
        variant: "solid",
    },
}

export default Tooltip;