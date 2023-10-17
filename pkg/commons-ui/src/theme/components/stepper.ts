const Stepper = {
    variants: {
        "solid": (_: AsyncGeneratorFunctionConstructor) => ({
            title: {
                color: "brand.900",
                fontSize: '18px',
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
            },
            indicator: {
                borderWidth: "1px",
                borderColor: "brand.300",
                bgColor: "brand.300",
                outline: "0px solid",
                outlineColor: "brand.300",
                '&[data-status="active"]': {
                    borderColor: "brand.300",
                    color: "brand.300",
                    bgColor: "brand.900",
                    outlineColor: "brand.300",
                    outlineWidth: "8px",
                    outlineOffset: "-8px"
                },
                '&[data-status="complete"]': {
                    border: "0px",
                    borderColor: "brand.900",
                    color: "brand.900",
                    bgColor: "brand.300",
                    outlineColor: "brand.900",
                    outlineWidth: "1px",
                    outlineOffset: "-8px"
                },
            },
            separator: {
                '&[data-status="complete"]': {
                    bgColor: "brand.900",
                }
            },
            description: {
                fontSize: '14px'
            },
        }),
    },
    defaultProps: {
        variant: "solid",
    },
};

export default Stepper;