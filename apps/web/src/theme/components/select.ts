const Select = {
    variants: {
        "solid": (props: AsyncGeneratorFunctionConstructor) => ({
            field: {
                background: "white",
                border: "1px solid",
                borderRadius: "15px",
            }
        }),
    },
    defaultProps: {
        size: "md",
        variant: "solid",
    },
};

export default Select;