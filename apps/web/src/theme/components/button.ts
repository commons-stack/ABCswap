const Button = {
  variants: {
    "solid": (props: AsyncGeneratorFunctionConstructor) => ({
      bgColor: "brand.900",
      padding: "8px 20px",
      borderRadius: "20px",
      color: "brand.500",
      w: "270px",
    }),
    "outline": (props: AsyncGeneratorFunctionConstructor) => ({
      borderColor: "brand.900",
      borderWidth: "1px",  // <- Add this line
      padding: "8px 20px",
      borderRadius: "20px",
      color: "brand.900",
      w: "270px",
    }),
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};

export default Button;
