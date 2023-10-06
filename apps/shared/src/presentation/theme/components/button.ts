const Button = {
  variants: {
    "solid": (_: AsyncGeneratorFunctionConstructor) => ({
      bgColor: "brand.900",
      padding: "8px 20px",
      borderRadius: "20px",
      color: "brand.500",
      w: "270px",
      _hover: {
        bgColor: "brand.500",
        color: "brand.900",
      }
    }),
    "outline": (_: AsyncGeneratorFunctionConstructor) => ({
      borderColor: "brand.900",
      borderWidth: "1px", 
      padding: "8px 20px",
      borderRadius: "20px",
      color: "brand.900",
      w: "270px",
      _hover: {
        bgColor: "brand.500",
        borderColor: "brand.500",
      }
    }),
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};

export default Button;
