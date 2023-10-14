const Slider = {
    variants: {
        "solid": (_: AsyncGeneratorFunctionConstructor) => ({
            filledTrack: { 
                bgColor: "brand.500",
                height: "8px",
            },
            track: {
                bgColor: "brand.100",
                height: "8px",
            },
            thumb: {
                bg: "brand.900",
                height: "20px",
                width: "20px",
            },
        }),
    },
    defaultProps: {
        size: "md",
        variant: "solid",
    },
};

export default Slider;