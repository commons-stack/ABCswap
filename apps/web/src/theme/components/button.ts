// theme/components/button.js
const Button = {
    variants: {
      "solid": (props: AsyncGeneratorFunctionConstructor) => ({
        bgColor: "brand.900",
        padding: "8px 20px",
        borderRadius: "20px",
        color: "brand.500",
      }),
      "outline": (props: AsyncGeneratorFunctionConstructor) => ({
        borderColor: "brand.900",
        padding: "8px 20px",
        borderRadius: "20px",
        color: "brand.900",
      }),
    },
    defaultProps: {
      size: "md",
      variant: "solid",
    },
  };
  
  export default Button;
  