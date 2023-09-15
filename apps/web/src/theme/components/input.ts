const Input = {
  baseStyle: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "24px",
  },
  variants: {
    solid: (props: AsyncGeneratorFunctionConstructor) => ({
      bgColor: "white",
      padding: 3,
      borderRadius: "15px",
      border: "1px solid #003C00",
      color: "#003C00",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      height: "100%",
    }),
  },
  defaultProps: {
    variant: "solid",
  },
};

export default Input;
